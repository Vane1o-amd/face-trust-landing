"use client";

import { useEffect, useState } from "react";

/**
 * Intro preloader — full-screen brand overlay shown on first paint.
 * Fades out after a short brand beat (or on window load), whichever is later.
 * Respects prefers-reduced-motion: static + shorter hold.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 450 : 1100;

    let t: ReturnType<typeof setTimeout>;
    const finish = () => {
      setHidden(true);
      t = setTimeout(() => setRemoved(true), 650);
    };

    const min = setTimeout(finish, hold);
    const onLoad = () => {
      clearTimeout(min);
      // keep the brand beat even if assets finish early
      setTimeout(finish, Math.max(0, hold - 300));
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      clearTimeout(min);
      clearTimeout(t);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`preloader fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* Expanding ring */}
          <span className="preloader-ring absolute inset-0 rounded-full border border-[var(--metallic)]/30" />
          {/* Monogram — letter A in metallic serif */}
          <span className="chrome-text preloader-mono text-5xl font-semibold">A</span>
        </div>
        {/* Wordmark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Artur Ivashchenko"
          className="preloader-mono h-[44px] w-auto max-w-[220px] object-contain"
          style={{ animationDelay: "0.05s" }}
        />
        <p className="preloader-cap text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--ink-soft)]">
          A face worth trusting
        </p>
      </div>
    </div>
  );
}