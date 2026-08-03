import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadToTelegram, sendLeadPhotos } from "@/lib/telegram";
import { hasEnv } from "@/lib/env";

export const runtime = "nodejs";

const MAX_PHOTO_BYTES = 12 * 1024 * 1024; // 12 MB per photo
const MAX_BODY_BYTES = 26 * 1024 * 1024; // 26 MB total request (2 photos + form overhead)
const ALLOWED_PHOTO = /^image\/(jpe?g|png|webp)$/i;

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
  if (!isJpeg && !isPng && !isWebp) throw new Error("File is not an image");
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
  if (!checkOrigin(req)) {
    return NextResponse.json({ error: "Request rejected" }, { status: 403 });
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
      await sendLeadPhotos(photos, parsed.data.name);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send. Try again." },
      { status: 502 }
    );
  }
}