import { parseEnv } from "./env";

export interface Lead {
  name: string;
  age: string;
  telegram: string;
  instagram?: string;
  complaint: string;
}

export async function sendLeadToTelegram(lead: Lead): Promise<void> {
  const env = parseEnv();
  // Plain text mode — no HTML parse_mode, so user input is treated literally.
  // No injection vector regardless of field content.
  const lines = [
    "🔔 Новая заявка на диагностику",
    "",
    `👤 Имя: ${lead.name}`,
    `🎂 Возраст: ${lead.age}`,
    `💬 Telegram: ${lead.telegram}`,
    lead.instagram ? `📸 Instagram: ${lead.instagram}` : null,
    "",
    "❓ Чем недоволен:",
    lead.complaint,
  ];
  const text = lines.filter((l): l is string => l !== null).join("\n");

  const res = await fetch(
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

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
}
