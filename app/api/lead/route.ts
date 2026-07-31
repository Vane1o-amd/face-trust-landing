import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadToTelegram } from "@/lib/telegram";
import { hasEnv } from "@/lib/env";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(80),
  age: z.string().trim().min(1, "Укажите возраст").max(3),
  telegram: z
    .string()
    .trim()
    .min(3, "Укажите Telegram")
    .max(80)
    .refine((v) => !/<|>/i.test(v), "Некорректный ввод"),
  instagram: z
    .string()
    .trim()
    .max(80)
    .refine((v) => v === "" || !/<|>/i.test(v), "Некорректный ввод")
    .optional()
    .or(z.literal("")),
  complaint: z.string().trim().min(5, "Опишите подробнее").max(2000),
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Проверьте поля";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!hasEnv()) {
    return NextResponse.json(
      { error: "Сервис временно недоступен. Напишите в Telegram напрямую." },
      { status: 503 }
    );
  }

  try {
    await sendLeadToTelegram({
      name: parsed.data.name,
      age: parsed.data.age,
      telegram: parsed.data.telegram,
      instagram: parsed.data.instagram || undefined,
      complaint: parsed.data.complaint,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Не удалось отправить. Попробуйте ещё раз." },
      { status: 502 }
    );
  }
}