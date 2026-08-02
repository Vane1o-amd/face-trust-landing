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
    "🔔 Новая заявка на диагностику",
    "",
    `👤 Имя: ${lead.name}`,
    `💬 Telegram: ${lead.telegram}`,
    lead.instagram ? `📸 Instagram: ${lead.instagram}` : null,
    "",
    "❓ Чем недоволен:",
    lead.complaint,
    lead.hasPhotos ? "📷 Фото лица приложены отдельным сообщением" : null,
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
  } catch {
    throw new Error("Telegram unreachable");
  }

  if (!res.ok) {
    // Don't leak response body or token-bearing URL — generic message only.
    throw new Error("Telegram unreachable");
  }
}

/**
 * Send attached face photos as a Telegram media group (max 2 photos).
 * Photos are uploaded via multipart attach:// refs so no external URL is needed.
 */
export async function sendLeadPhotos(photos: File[], name: string): Promise<void> {
  if (photos.length === 0) return;
  const env = parseEnv();

  const media = photos.map((_, i) => ({
    type: "photo" as const,
    media: `attach://photo${i}`,
    caption: i === 0 ? `📷 Фото заявки — ${name}` : undefined,
  }));

  const body = new FormData();
  body.append(
    "media",
    new Blob([JSON.stringify(media)], { type: "application/json" }),
    "media.json"
  );
  photos.forEach((p, i) => {
    const safeName = (p.name || `photo${i}.jpg`).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 64);
    body.append(`photo${i}`, p, safeName);
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
  } catch {
    throw new Error("Telegram unreachable");
  }

  if (!res.ok) {
    throw new Error("Telegram unreachable");
  }
}