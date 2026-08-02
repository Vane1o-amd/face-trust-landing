"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "ok" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    telegram: "",
    instagram: "",
    complaint: "",
    website: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Не удалось отправить. Попробуйте ещё раз.");
        setStatus("error");
        return;
      }
      setStatus("ok");
      setForm({ name: "", age: "", telegram: "", instagram: "", complaint: "", website: "" });
    } catch {
      setError("Сеть недоступна. Попробуйте ещё раз.");
      setStatus("error");
    }
  }

  return (
    <section id="lead" className="py-24 sm:py-32 bg-moss border-t border-[var(--line)] relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full opacity-30 blur-[120px] blob-sand" />
      <div className="relative mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Заявка</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text">
            Бесплатная диагностика лица
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-soft)]">
            Оставьте контакт и расскажите, чем недовольны во внешности. Свяжусь с вами
            лично в течение дня и предложу план.
          </p>
        </Reveal>

        {status === "ok" ? (
          <Reveal delay={0.05}>
            <div className="mt-10 metallic-border rounded-2xl p-10 text-center glow">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/15 flex items-center justify-center text-2xl text-emerald-400">✓</div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">Заявка отправлена</h3>
              <p className="mt-2 text-[15px] text-[var(--ink-soft)]">Свяжусь с вами в Telegram в ближайшее время.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.05}>
            <form onSubmit={onSubmit} className="mt-10 metallic-border rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <Field label="Имя" required>
                <input value={form.name} onChange={update("name")} required maxLength={80} className={inputCls} placeholder="Как к вам обращаться" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Возраст" required>
                  <input value={form.age} onChange={update("age")} required maxLength={3} inputMode="numeric" className={inputCls} placeholder="35" />
                </Field>
                <Field label="Telegram" required>
                  <input value={form.telegram} onChange={update("telegram")} required maxLength={80} className={inputCls} placeholder="@username" />
                </Field>
              </div>
              <Field label="Instagram (необязательно)">
                <input value={form.instagram} onChange={update("instagram")} maxLength={80} className={inputCls} placeholder="@username" />
              </Field>
              <Field label="Чем вы недовольны в своей внешности?" required>
                <textarea value={form.complaint} onChange={update("complaint")} required minLength={5} maxLength={2000} rows={4} className={`${inputCls} resize-none`} placeholder="Опишите своими словами" />
              </Field>
              {/* Honeypot — visually hidden but present in DOM so bots fill it */}
              <input value={form.website} onChange={update("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" className="opacity-0 absolute -z-10 h-0 w-0" />
              <button
                type="submit"
                disabled={status === "loading"}
                className="chrome-btn mt-2 rounded-full text-[15px] font-semibold px-6 py-3.5 transition disabled:opacity-60"
              >
                {status === "loading" ? "Отправка…" : "Отправить заявку"}
              </button>
              {error && <p className="text-[14px] text-red-400">{error}</p>}
              <p className="text-[12px] text-[var(--ink-soft)] text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--ink)]">
                  обработкой персональных данных
                </Link>.
              </p>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-[var(--line)] bg-black/40 px-4 py-3 text-[15px] text-[var(--ink)] outline-none transition-colors focus:border-[rgba(200,200,210,0.6)] focus:ring-2 focus:ring-white/30 placeholder:text-[var(--ink-soft)]/60";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-[var(--ink)]">{label}{required && <span className="text-[var(--ink-soft)]"> *</span>}</span>
      {children}
    </label>
  );
}
