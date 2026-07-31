import { z } from "zod";

const schema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, "TELEGRAM_BOT_TOKEN required"),
  ARTUR_CHAT_ID: z.string().min(1, "ARTUR_CHAT_ID required"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://example.com"),
});

export type Env = z.infer<typeof schema>;

export function parseEnv(): Env {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid env:\n${parsed.error.toString()}`);
  }
  return parsed.data;
}

export function hasEnv(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.ARTUR_CHAT_ID);
}