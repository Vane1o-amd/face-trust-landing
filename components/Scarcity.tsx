"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const TOTAL = 3;
const TAKEN = 3;
const LEFT = TOTAL - TAKEN;

export function Scarcity() {
  const [left] = useState(LEFT);
  const pct = (left / TOTAL) * 100;
  const closed = left === 0;
  return (
    <section id="scarcity" className="py-24 sm:py-32 border-t border-[var(--line)] bg-sand">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="metallic-border rounded-3xl p-8 sm:p-12 text-center glow">
            <span className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Limit</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
              3 spots per month
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[var(--ink-soft)] max-w-xl mx-auto">
              With everyone personally — deep, not mass. Booking closes when spots are taken.
            </p>
            <div className="mt-7 mx-auto max-w-sm">
              <div className="flex items-center justify-between text-[14px] font-medium">
                <span className="text-[var(--ink-soft)]">{closed ? "Taken" : "Open"}</span>
                <span className="chrome-text font-semibold">{TAKEN} of {TOTAL}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-[var(--line)] overflow-hidden">
                <div className={`h-full rounded-full transition-all ${closed ? "bg-[var(--ink-soft)]/60" : "bg-emerald-700/80"}`} style={{ width: `${closed ? 100 : pct}%` }} />
              </div>
            </div>
            {closed ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-black/[0.02] px-6 py-3.5 text-[15px] font-medium text-[var(--ink-soft)]">
                <span aria-hidden className="h-2 w-2 rounded-full bg-red-400/80" />
                Booking closed — join the waitlist
              </div>
            ) : (
              <a href="#lead" className="chrome-btn mt-8 inline-flex rounded-full text-[15px] font-semibold px-6 py-3.5 transition whitespace-normal">Take a spot</a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
