"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";

type Status = "idle" | "loading" | "ok" | "error";

// Module-scope so it does not inflate the component body. Pure: only touches
// its argument. EXIF orientation is honoured by the browser's default
// image-orientation: from-image on <img>.
function downscalePhoto(file: File, maxDim = 1600, quality = 0.82): Promise<File> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Cannot process image"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Cannot process image"));
            return;
          }
          const name = (file.name || "photo").replace(/\.[^.]+$/, "") + ".jpg";
          resolve(new File([blob], name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Cannot read image"));
    };
    img.src = url;
  });
}

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
  const [busyPhoto, setBusyPhoto] = useState<"front" | "side" | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Client-side downscale: phone photos are often 3-8 MB JPEGs. Vercel Hobby
  // caps the serverless request body at 4.5 MB, so a large upload is rejected
  // at the platform BEFORE the route runs (and even when it slips through,
  // large multipart uploads to Telegram are flakier). Downsizing to max 1600 px
  // / JPEG 0.82 yields ~150-500 KB — always under every limit, faster upload,
  // and the boss reliably receives the photo.
  async function pickPhoto(which: "front" | "side", e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    if (f.size > 12 * 1024 * 1024) {
      setError("Photo too large (max 12 MB)");
      e.target.value = "";
      return;
    }
    if (!/^image\/(jpe?g|png|webp|heic|heif)$/i.test(f.type)) {
      setError("Only JPG, PNG, WEBP, HEIC allowed");
      e.target.value = "";
      return;
    }
    setError("");
    setBusyPhoto(which);
    try {
      const small = await downscalePhoto(f);
      if (which === "front") setFront(small);
      else setSide(small);
    } catch {
      // Browser cannot decode the image (e.g. iPhone HEIC has no native
      // <img> decoder). Send the original file unchanged — Telegram handles
      // HEIC, and the server validates magic bytes before forwarding.
      if (which === "front") setFront(f);
      else setSide(f);
    } finally {
      setBusyPhoto(null);
    }
  }

  function clearPhoto(which: "front" | "side") {
    if (which === "front") {
      setFront(null);
      if (frontRef.current) frontRef.current.value = "";
    } else {
      setSide(null);
      if (sideRef.current) sideRef.current.value = "";
    }
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
      // Server re-verifies consent (H1) — never rely on the client alone for
      // GDPR Art. 9 biometric consent.
      fd.append("consent", consent ? "true" : "");
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
          <h2 className="mt-3 text-[26px] sm:text-4xl font-semibold tracking-tight chrome-text">
            Free face diagnosis
          </h2>
          <p className="mt-4 text-[14px] sm:text-[16px] leading-relaxed text-[var(--ink-soft)]">
            Leave a contact and attach face photos (front and side). I'll reach out
            personally within a day and propose a plan.
          </p>
        </Reveal>

        {status === "ok" ? (
          <Reveal delay={0.05}>
            <div className="mt-8 metallic-border rounded-2xl p-8 sm:p-10 text-center glow">
              <div className="mx-auto h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-sky-700/15 flex items-center justify-center text-xl sm:text-2xl text-sky-700">✓</div>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold tracking-tight">Application sent</h3>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[var(--ink-soft)]">I'll contact you on Telegram shortly.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.05}>
            <form onSubmit={onSubmit} className="mt-8 metallic-border rounded-2xl p-4 sm:p-8 flex flex-col gap-3 sm:gap-4">
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
                <PhotoField label="Front face photo" file={front} busy={busyPhoto === "front"} onPick={(e) => pickPhoto("front", e)} onClear={() => clearPhoto("front")} inputRef={frontRef} />
                <PhotoField label="Side face photo" file={side} busy={busyPhoto === "side"} onPick={(e) => pickPhoto("side", e)} onClear={() => clearPhoto("side")} inputRef={sideRef} />
              </div>

              {/* Honeypot — visually hidden but present in DOM so bots fill it */}
              <input value={form.website} onChange={update("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" className="opacity-0 absolute -z-10 h-0 w-0" />

              <label className="flex items-start gap-2.5 text-[12px] sm:text-[13px] leading-relaxed text-[var(--ink-soft)] cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 accent-sky-700"
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
                className="chrome-btn mt-2 rounded-full text-[14px] sm:text-[15px] font-semibold px-5 sm:px-6 py-3 sm:py-3.5 transition disabled:opacity-60"
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
  "w-full rounded-xl border border-[var(--line)] bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] text-slate-900 outline-none transition-colors focus:border-[var(--ink)] focus:ring-2 focus:ring-[var(--ink)]/15 placeholder:text-slate-500";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] sm:text-[13px] font-medium text-[var(--ink)]">{label}{required && <span className="text-[var(--ink-soft)]"> *</span>}</span>
      {children}
    </label>
  );
}

function PhotoField({
  label,
  file,
  busy,
  onPick,
  onClear,
  inputRef,
}: {
  label: string;
  file: File | null;
  busy: boolean;
  onPick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] sm:text-[13px] font-medium text-[var(--ink)]">{label}</span>
      <div className="relative">
        <label className={`block cursor-pointer rounded-xl border border-dashed border-[var(--line)] bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 pr-11 text-[13px] sm:text-[14px] text-slate-600 transition-colors ${busy ? "opacity-60" : "hover:border-slate-900"}`}>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            onChange={onPick}
            disabled={busy}
            className="hidden"
          />
          <span className="block truncate">{busy ? "Compressing…" : file ? file.name : "Tap to choose a photo"}</span>
        </label>
        {file && (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Remove ${label}`}
            className="absolute top-1/2 right-2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-900/5 hover:text-slate-900 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}