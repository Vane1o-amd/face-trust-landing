"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#problem", label: "Проблема" },
  { href: "#program", label: "Программа" },
  { href: "#timeline", label: "Сроки" },
  { href: "#bonuses", label: "Бонусы" },
  { href: "#guarantee", label: "Гарантия" },
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
          ? "backdrop-blur-xl bg-black/70 border-b border-[var(--line)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Лицо, которому доверяют" className="h-14 w-14 sm:h-20 sm:w-20 object-contain rounded-full" />
          <span className="text-[15px] sm:text-[16px] font-semibold tracking-tight chrome-text hidden sm:block">Артур Иващенко</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-[14px] text-[var(--ink-soft)]">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--ink)] transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#lead" className="chrome-btn rounded-full text-[13px] sm:text-[14px] font-semibold px-4 py-2 sm:px-5 sm:py-2.5 transition whitespace-normal text-center">
            Бесплатная диагностика
          </a>
          <button
            type="button"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-[var(--line)] text-[var(--ink)]"
          >
            <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-black/90 backdrop-blur-xl">
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
