"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Detail = {
  groups: { label: string | null; items: string[] }[];
  closing: string;
};

type Step = {
  n: number;
  weeks: string;
  t: string;
  d: string;
  detail: Detail;
};

const STEPS: Step[] = [
  {
    n: 1,
    weeks: "Week 1",
    t: "Diagnostics and strategy",
    d: "A full analysis of your face, body and lifestyle. We identify the main reasons holding your looks back and build a personal transformation plan.",
    detail: {
      groups: [
        {
          label: "First we run a deep audit:",
          items: [
            "hairstyle and hair condition;",
            "face and body analysis;",
            "lifestyle analysis;",
            "work schedule review;",
            "nutrition analysis;",
            "sleep analysis;",
            "activity level analysis;",
            "identifying habits and weak spots;",
            "defining your starting point and desired result.",
          ],
        },
      ],
      closing: "Based on the audit we build a personal transformation plan around your schedule and goals.",
    },
  },
  {
    n: 2,
    weeks: "Weeks 2–4",
    t: "Building the foundation",
    d: "We gradually embed a simple system into your life — without strict restrictions or extra effort.",
    detail: {
      groups: [
        {
          label: null,
          items: [
            "skincare — simple and effective enough;",
            "supplements matched to your rhythm and lifestyle;",
            "a sleep schedule tied to your calendar;",
            "a system that takes minimal time and doesn't distract from your work;",
            "eating without strict limits — you can eat out and not cook every day.",
          ],
        },
      ],
      closing: "We adjust the foundation that's already there. By week 4 people around you see significant change: you'll read the result in their reaction before the mirror.",
    },
  },
  {
    n: 3,
    weeks: "Weeks 5–8",
    t: "Sculpting an expressive face",
    d: "We amplify the result: reduce puffiness, lower body fat, improve skin, hair and the details of your appearance.",
    detail: {
      groups: [
        {
          label: null,
          items: [
            "reduce puffiness;",
            "make the face more expressive;",
            "improve skin quality;",
            "work on body fat percentage;",
            "sharpen facial contours;",
            "correct the details that give the biggest visual effect;",
            "keep adapting the system to your lifestyle.",
          ],
        },
      ],
      closing: "Here we sharpen the contours and details that form an \"expensive\" face.",
    },
  },
  {
    n: 4,
    weeks: "Weeks 9–11",
    t: "Lock-in and automation",
    d: "We lock in the result, automate every habit and build a system you can maintain for years.",
    detail: {
      groups: [
        {
          label: null,
          items: [
            "lock in all habits;",
            "automate nutrition, skincare and training;",
            "build a long-term maintenance plan;",
            "eliminate the last weak spots;",
            "form a system that's easy to keep even with a heavy schedule and frequent travel.",
          ],
        },
      ],
      closing: "By the end of the program you don't get a temporary result — you get a system you can maintain for years without feeling like you live \"on a program\".",
    },
  },
];

export function ProgramContents() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section id="program" className="py-24 sm:py-32 bg-[var(--bg-soft)] border-t border-[var(--line)] relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Your 11-week path</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            The "A face worth trusting" program
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <Reveal key={s.n} delay={(i % 4) * 0.05}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`metallic-border h-full rounded-2xl p-6 flex flex-col gap-3 text-left transition-colors w-full ${
                    isActive ? "ring-2 ring-[var(--ink)]/25 bg-black/[0.04]" : "hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">0{s.n}/4</span>
                    <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-black/[0.02] px-2.5 py-1">{s.weeks}</span>
                  </div>
                  <h3 className="text-[17px] font-semibold tracking-tight">{s.t}</h3>
                  <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{s.d}</p>
                  <span className="mt-auto pt-2 text-[13px] font-medium text-sky-700">
                    {isActive ? "Open ↓" : "More →"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal key={active} delay={0.02}>
          <div className="mt-6 metallic-border rounded-2xl p-7 sm:p-9">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-[13px] font-mono text-[var(--ink-soft)]">Stage 0{step.n}/4</span>
              <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-black/[0.02] px-2.5 py-1">{step.weeks}</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight chrome-text">{step.t}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-soft)] max-w-2xl">{step.d}</p>
            {step.detail.groups.map((g, gi) => (
              <div key={gi} className="mt-5">
                {g.label && <p className="text-[15px] font-medium text-[var(--ink)]">{g.label}</p>}
                <ul className="mt-2 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {g.items.map((it, ii) => (
                    <li key={ii} className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--ink-soft)]">
                      <span aria-hidden className="text-sky-700 mt-0.5">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink)] italic max-w-2xl">{step.detail.closing}</p>
          </div>
        </Reveal>

        <p className="mt-6 text-[14px] text-[var(--ink-soft)]">
          11 weeks — the path to a face people trust. Tap any stage above to see exactly what happens at that stage.
        </p>
      </div>
    </section>
  );
}