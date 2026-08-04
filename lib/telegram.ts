import { parseEnv } from "./env";

export interface Lead {
  name: string;
  telegram: string;
  instagram?: string;
  complaint: string;
  hasPhotos?: boolean;
}

export async function sendLeadToTelegram(lead: Lead): Promise<void> {
  const env = parseEnv();
  // Plain text mode — no HTML parse_mode, so user input is treated literally.
  // No injection vector regardless of field content.
  const lines = [
    "🔔 New diagnosis application",
    "",
    `👤 Name: ${lead.name}`,
    `💬 Telegram: ${lead.telegram}`,
    lead.instagram ? `📸 Instagram: ${lead.instagram}` : null,
    "",
    "❓ What they're unhappy about:",
    lead.complaint,
    lead.hasPhotos ? "📷 Face photos attached in a separate message" : null,
  ];
  const text = lines.filter((l): l is string => l !== null).join("\n");

  let res: Response;
  try {
    res = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.ARTUR_CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10000),
      }
    );
  } catch (e) {
    throw new Error(`Telegram network error: ${e instanceof Error ? e.message : "timeout"}`);
  }

  if (!res.ok) {
    // Surface status + body to server logs; route masks long runs (token).
    const text = await res.text().catch(() => "");
    throw new Error(`Telegram sendMessage ${res.status}: ${text.slice(0, 300)}`);
  }
}

/**
 * Send attached face photos as a Telegram media group (max 2 photos).
 * Photos are uploaded via multipart attach:// refs so no external URL is needed.
 */
export async function sendLeadPhotos(photos: File[], name: string): Promise<void> {
  if (photos.length === 0) return;
  const env = parseEnv();

  // sendMediaGroup requires ALL items share the same type. If any photo is
  // HEIC/HEIF (no Telegram photo decoder), send the whole group as document
  // so Telegram accepts it and the boss can open every file. Otherwise photo.
  const anyHeic = photos.some((p) => /^image\/(heic|heif)$/i.test(p.type));
  const groupType = anyHeic ? "document" : "photo";
  const media = photos.map((p, i) => ({
    type: groupType as "photo" | "document",
    media: `attach://photo${i}`,
    caption: i === 0 ? `📷 Application photo — ${name}` : undefined,
  }));

  // Telegram sendMediaGroup expects `media` as a JSON *string* field, not a
  // file. Appending a Blob made Telegram treat it as a file part named
  // "media.json", so the media group parsed empty and photos never posted.
  const body = new FormData();
  body.append("media", JSON.stringify(media));
  photos.forEach((p, i) => {
    // Ensure a sensible extension so Telegram routes HEIC as a file and
    // JPEG/PNG as images.
    const ext = /^image\/(heic|heif)$/i.test(p.type)
      ? ".heic"
      : /png/i.test(p.type)
        ? ".png"
        : /webp/i.test(p.type)
          ? ".webp"
          : ".jpg";
    const base = (p.name || `photo${i}`).replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60);
    body.append(`photo${i}`, p, `${base}${ext}`);
  });

  let res: Response;
  try {
    res = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMediaGroup`,
      {
        method: "POST",
        body,
        signal: AbortSignal.timeout(30000),
      }
    );
  } catch (e) {
    throw new Error(`Telegram network error: ${e instanceof Error ? e.message : "timeout"}`);
  }

  if (!res.ok) {
    // Surface Telegram's actual status + body to server logs (the route
    // masks long runs before logging, so the bot token stays redacted).
    const text = await res.text().catch(() => "");
    throw new Error(`Telegram sendMediaGroup ${res.status}: ${text.slice(0, 300)}`);
  }
}