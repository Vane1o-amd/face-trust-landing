import { z } from "zod";

const schema = z.object({
  TELEGRAM_BOT_TOKEN: z
    .string()
    .regex(/^\d{6,}:[A-Za-z0-9_-]{35}$/, "TELEGRAM_BOT_TOKEN malformed"),
  ARTUR_CHAT_ID: z.string().regex(/^-?\d+$/, "ARTUR_CHAT_ID malformed"),
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