"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "ok" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [front, setFront] = useState<File | null>(null);
  const [side, setSide] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    telegram: "",
    instagram: "",
    complaint: "",
    website: "",
  });

  const frontRef = useRef<HTMLInputElement>(null);
  const sideRef = useRef<HTMLInputElement>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function pickPhoto(which: "front" | "side", e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f) {
      if (f.size > 12 * 1024 * 1024) {
        setError("Photo too large (max 12 MB)");
        e.target.value = "";
        return;
      }
      if (!/^image\/(jpe?g|png|webp)$/i.test(f.type)) {
        setError("Only JPG, PNG, WEBP allowed");
        e.target.value = "";
        return;
      }
      setError("");
    }
    if (which === "front") setFront(f);
    else setSide(f);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hasPhotos = Boolean(front || side);
    // GDPR Art. 9: biometric data needs explicit consent before transfer.
    if (hasPhotos && !consent) {
      setError("Confirm consent to process your photos");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("telegram", form.telegram);
      fd.append("instagram", form.instagram);
      fd.append("complaint", form.complaint);
      fd.append("website", form.website);
      if (front) fd.append("front", front);
      if (side) fd.append("side", side);

      const res = await fetch("/api/lead", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Failed to send. Try again.");
        setStatus("error");
        return;
      }
      setStatus("ok");
      setForm({ name: "", telegram: "", instagram: "", complaint: "", website: "" });
      setFront(null);
      setSide(null);
      setConsent(false);
      if (frontRef.current) frontRef.current.value = "";
      if (sideRef.current) sideRef.current.value = "";
    } catch {
      setError("Network unavailable. Try again.");
      setStatus("error");
    }
  }

  return (
    <section id="lead" className="py-24 sm:py-32 bg-moss border-t border-[var(--line)] relative overflow-hidden">
      <div className="relative mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Application</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight chrome-text">
            Free face diagnosis
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-soft)]">
            Leave a contact and attach face photos (front and side). I'll reach out
            personally within a day and propose a plan.
          </p>
        </Reveal>

        {status === "ok" ? (
          <Reveal delay={0.05}>
            <div className="mt-10 metallic-border rounded-2xl p-10 text-center glow">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-700/15 flex items-center justify-center text-2xl text-emerald-700">✓</div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">Application sent</h3>
              <p className="mt-2 text-[15px] text-[var(--ink-soft)]">I'll contact you on Telegram shortly.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.05}>
            <form onSubmit={onSubmit} className="mt-10 metallic-border rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <Field label="Name" required>
                <input value={form.name} onChange={update("name")} required maxLength={80} className={inputCls} placeholder="What to call you" />
              </Field>
              <Field label="Telegram" required>
                <input value={form.telegram} onChange={update("telegram")} required maxLength={80} className={inputCls} placeholder="@username" />
              </Field>
              <Field label="Instagram (optional)">
                <input value={form.instagram} onChange={update("instagram")} maxLength={80} className={inputCls} placeholder="@username" />
              </Field>
              <Field label="What are you unhappy about in your appearance?" required>
                <textarea value={form.complaint} onChange={update("complaint")} required minLength={5} maxLength={2000} rows={4} className={`${inputCls} resize-none`} placeholder="Describe in your own words" />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <PhotoField label="Front face photo" file={front} onPick={(e) => pickPhoto("front", e)} inputRef={frontRef} />
                <PhotoField label="Side face photo" file={side} onPick={(e) => pickPhoto("side", e)} inputRef={sideRef} />
              </div>

              {/* Honeypot — visually hidden but present in DOM so bots fill it */}
              <input value={form.website} onChange={update("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" className="opacity-0 absolute -z-10 h-0 w-0" />

              <label className="flex items-start gap-3 text-[13px] leading-relaxed text-[var(--ink-soft)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-700"
                />
                <span>
                  I consent to the processing of biometric data (face photos), their
                  transfer to Telegram and storage for up to 30 days after the reply. See{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--ink)]">
                    privacy policy
                  </Link>.
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="chrome-btn mt-2 rounded-full text-[15px] font-semibold px-6 py-3.5 transition disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Send application"}
              </button>
              {error && <p className="text-[14px] text-red-700">{error}</p>}
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition-colors focus:border-[var(--ink)] focus:ring-2 focus:ring-[var(--ink)]/15 placeholder:text-slate-500";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-[var(--ink)]">{label}{required && <span className="text-[var(--ink-soft)]"> *</span>}</span>
      {children}
    </label>
  );
}

function PhotoField({
  label,
  file,
  onPick,
  inputRef,
}: {
  label: string;
  file: File | null;
  onPick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <label className="flex flex-col gap-1.5 cursor-pointer">
      <span className="text-[13px] font-medium text-[var(--ink)]">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onPick}
        className="hidden"
      />
      <span className="rounded-xl border border-dashed border-[var(--line)] bg-white px-4 py-3 text-[14px] text-slate-600 truncate transition-colors hover:border-slate-900">
        {file ? file.name : "Tap to choose a photo"}
      </span>
    </label>
  );
}