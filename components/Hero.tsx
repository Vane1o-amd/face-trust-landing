"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="pt-28 pb-14 sm:pt-44 sm:pb-28 relative overflow-hidden bg-moss">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <Reveal>
            <h1 className="text-[32px] sm:text-5xl lg:text-6xl font-semibold tracking-tight-display leading-[1.06] chrome-text text-balance">
              A face worth trusting in 11 weeks
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-4 max-w-xl space-y-3">
              <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
                A personal program for entrepreneurs and ambitious men who want to look as expensive as their ambitions.
              </p>
              <ul className="space-y-2 text-[14px] text-[var(--ink)]">
                {["20% of effort — 80% of results", "Personal guidance", "Result guaranteed"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span aria-hidden className="text-sky-700">✔</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#lead" className="chrome-btn rounded-full text-[14px] font-semibold px-5 py-3 text-center transition whitespace-normal">Get a free diagnosis</a>
              <a href="#program" className="ghost-btn rounded-full text-[14px] font-medium px-5 py-3 text-center transition whitespace-normal">How the program works</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={32}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroVisual() {
  const [show, setShow] = useState<"before" | "after">("before");
  const isAfter = show === "after";
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--bg-card)] metallic-border glow select-none">
        {/* Slide track — before on the left, after on the right */}
        <div
          className="absolute inset-0 flex w-[200%] will-change-transform"
          style={{ transform: isAfter ? "translateX(-50%)" : "translateX(0%)", transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/before/before-hero.jpg" alt="Artur Ivashchenko — before the program" draggable={false} className="relative w-1/2 h-full object-cover shrink-0" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/before/after-hero.jpg" alt="Artur Ivashchenko — after the program" draggable={false} className="relative w-1/2 h-full object-cover shrink-0" />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="text-[12px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur text-white rounded-full px-2.5 py-1 border border-white/10">
            {isAfter ? "After the program" : "Before the program"}
          </span>
          {/* Progress dots */}
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className={`h-1.5 rounded-full transition-all ${isAfter ? "w-3 bg-white/40" : "w-5 bg-white"}`} />
            <span className={`h-1.5 rounded-full transition-all ${isAfter ? "w-5 bg-white" : "w-3 bg-white/40"}`} />
          </span>
        </div>

        {/* Left corner tap zone → back to before */}
        <button
          type="button"
          onClick={() => setShow("before")}
          aria-label="See before the program"
          className={`group absolute left-0 top-0 h-full w-1/3 flex items-center justify-start pl-3 transition-opacity ${isAfter ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 backdrop-blur text-white border border-white/15 group-hover:bg-black/65 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        {/* Right corner tap zone → go to after */}
        <button
          type="button"
          onClick={() => setShow("after")}
          aria-label="See after the program"
          className={`group absolute right-0 top-0 h-full w-1/3 flex items-center justify-end pr-3 transition-opacity ${isAfter ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/45 backdrop-blur text-white border border-white/15 group-hover:bg-black/65 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}