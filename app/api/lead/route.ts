import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadToTelegram, sendLeadPhotos } from "@/lib/telegram";
import { hasEnv } from "@/lib/env";

export const runtime = "nodejs";

const MAX_PHOTO_BYTES = 12 * 1024 * 1024; // 12 MB per photo
const MAX_BODY_BYTES = 26 * 1024 * 1024; // 26 MB total request (2 photos + form overhead)
const ALLOWED_PHOTO = /^image\/(jpe?g|png|webp|heic|heif)$/i;

// --- Rate limit (H2) -------------------------------------------------------
// Simple in-memory sliding window keyed by client IP. Best-effort under
// serverless: each warm instance keeps its own map, so this blocks bursts
// from a single IP hitting a warm instance. For multi-instance hardening,
// back this with Upstash/KV later — but an in-memory guard already stops
// the casual flood of fake leads (the actual threat here).
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 3; // 3 submissions per window per IP
const rateMap = new Map<string, number[]>();

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-vercel-forwarded-for") || req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateMap.set(ip, hits);
    return false;
  }
  hits.push(now);
  rateMap.set(ip, hits);
  return true;
}

// Periodically prune dead entries so the map does not grow unbounded.
// Runs only on request; no timer needed.
function pruneRateMap() {
  if (rateMap.size < 1000) return;
  const now = Date.now();
  for (const [ip, hits] of rateMap) {
    const live = hits.filter((t) => now - t < RATE_WINDOW_MS);
    if (live.length === 0) rateMap.delete(ip);
    else rateMap.set(ip, live);
  }
}

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  telegram: z
    .string()
    .trim()
    .min(3, "Enter your Telegram")
    .max(80)
    .refine((v) => !/<|>/i.test(v), "Invalid input"),
  instagram: z
    .string()
    .trim()
    .max(80)
    .refine((v) => v === "" || !/<|>/i.test(v), "Invalid input")
    .optional()
    .or(z.literal("")),
  complaint: z.string().trim().min(5, "Describe in more detail").max(2000),
  // H1 (server-side consent): biometric data requires explicit, affirmative
  // consent (GDPR Art. 9). The client gates the submit button on this, but the
  // server must re-verify — never trust the client for a legal precondition.
  // Accepted truthy markers from a checkbox: "true" | "on" | "yes".
  consent: z
    .enum(["true", "on", "yes"])
    .optional()
    .transform((v) => v === "true" || v === "on" || v === "yes"),
  // Honeypot: real users leave this empty; bots fill it. Validated as an
  // optional string, then we branch on a non-empty value to drop the
  // submission silently. (Previously .max(0) rejected valid honeypot catches.)
  website: z.string().max(80).optional(),
});

function readField(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

// Verify the file's actual bytes match its declared type — defends against
// renamed payloads before forwarding biometric data to Telegram.
async function checkMagicBytes(file: File): Promise<void> {
  const buf = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const isWebp =
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
  // HEIC/HEIF: ISO BMFF ftyp box at offset 4 — "ftyp" + brand (heic/heix/mif1/msf1).
  const str = new TextDecoder().decode(buf.slice(4, 12));
  const isHeic = str.startsWith("ftyp") && /^(heic|heix|hevc|mif1|msf1)$/.test(str.slice(4));
  if (!isJpeg && !isPng && !isWebp && !isHeic) throw new Error("File is not an image");
}

async function readPhoto(fd: FormData, key: string): Promise<File | null> {
  const v = fd.get(key);
  if (!(v instanceof File) || v.size === 0) return null;
  if (v.size > MAX_PHOTO_BYTES) throw new Error(`Photo "${key}" is too large (max 12 MB)`);
  if (!ALLOWED_PHOTO.test(v.type)) throw new Error("Only JPG, PNG, WEBP allowed");
  await checkMagicBytes(v);
  return v;
}

// Reject cross-origin posts when a canonical site URL is configured.
function checkOrigin(req: Request): boolean {
  const allowed = process.env.NEXT_PUBLIC_SITE_URL;
  if (!allowed || allowed === "https://example.com") return true; // not configured — allow
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin or non-browser client
  try {
    return new URL(origin).origin === new URL(allowed).origin;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  pruneRateMap();

  if (!checkOrigin(req)) {
    return NextResponse.json({ error: "Request rejected" }, { status: 403 });
  }

  // Rate limit before any heavy parsing / file reads.
  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const data = {
    name: readField(fd, "name"),
    telegram: readField(fd, "telegram"),
    instagram: readField(fd, "instagram"),
    complaint: readField(fd, "complaint"),
    consent: readField(fd, "consent"),
    website: readField(fd, "website"),
  };

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Check the fields";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  // Honeypot tripped: confirm to bot, drop silently.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  let front: File | null = null;
  let side: File | null = null;
  try {
    front = await readPhoto(fd, "front");
    side = await readPhoto(fd, "side");
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid photo";
    return NextResponse.json({ error: msg }, { status: 422 });
  }

  // H1: photos are biometric data — require proven server-side consent.
  if ((front || side) && !parsed.data.consent) {
    return NextResponse.json(
      { error: "Confirm consent to process your photos" },
      { status: 422 }
    );
  }

  if (!hasEnv()) {
    return NextResponse.json(
      { error: "Service temporarily unavailable. Message on Telegram directly." },
      { status: 503 }
    );
  }

  try {
    await sendLeadToTelegram({
      name: parsed.data.name,
      telegram: parsed.data.telegram,
      instagram: parsed.data.instagram || undefined,
      complaint: parsed.data.complaint,
      hasPhotos: Boolean(front || side),
    });
    if (front || side) {
      const photos = [front, side].filter((f): f is File => f !== null);
      try {
        await sendLeadPhotos(photos, parsed.data.name);
      } catch (photoErr) {
        // Text already delivered to Artur; log the photo failure so the
        // Vercel logs show the Telegram response status/body instead of a
        // bare 502. Mask anything that could leak the token.
        const msg = photoErr instanceof Error ? photoErr.message : String(photoErr);
        console.error("[lead] sendLeadPhotos failed:", msg.replace(/[A-Za-z0-9_-]{20,}/g, "***"));
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[lead] sendLeadToTelegram failed:", msg.replace(/[A-Za-z0-9_-]{20,}/g, "***"));
    return NextResponse.json(
      { error: "Failed to send. Try again." },
      { status: 502 }
    );
  }
}