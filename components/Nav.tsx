"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#program", label: "Program" },
  { href: "#timeline", label: "Timeline" },
  { href: "#bonuses", label: "Bonuses" },
  { href: "#guarantee", label: "Guarantee" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "backdrop-blur-xl bg-white/80 border-b border-[var(--line)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="A face worth trusting" className="h-14 w-14 sm:h-20 sm:w-20 object-contain rounded-full" />
          <span className="text-[15px] sm:text-[16px] font-semibold tracking-tight chrome-text hidden sm:block">EVOREDGE</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-[14px] text-[var(--ink-soft)]">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--ink)] transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#lead"
            className="chrome-btn inline-flex items-center justify-center rounded-full text-[13px] sm:text-[14px] font-semibold px-4 py-2.5 sm:px-5 sm:py-3 transition whitespace-normal text-center min-h-11"
          >
            Free diagnosis
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-11 w-11 grid place-items-center rounded-full border border-[var(--line)] text-[var(--ink)]"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-white/95 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-5 py-4 flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[16px] text-[var(--ink-soft)] hover:text-[var(--ink)] border-b border-[var(--line)] last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
