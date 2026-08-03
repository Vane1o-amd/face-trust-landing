import { Reveal } from "./Reveal";

const ITEMS = [
  { t: "You wake up switched on", d: "No heaviness in the body, no fog in the head. 10 minutes — and you have a powerful charge until evening." },
  { t: "A sense of superiority", d: "When you look in the mirror or at your photo from a video call. The look business owners walk into a room with." },
  { t: "Total freedom from routine", d: "You're always perfectly fed, eating restaurant-grade food anywhere in the world, without spending a minute of personal time on it." },
  { t: "Absolute clarity and health from within", d: "Your skin and body work at 100% without crutches and excess pharmacology." },
  { t: "Drive and joy in movement", d: "Instead of disciplinary drudgery. You do what you love, and your body gets lean and athletic on its own." },
  { t: "Peace of mind about your results", d: "The whole system works like a Swiss watch on autopilot, freeing your head for bigger tasks." },
];

export function Outcome() {
  return (
    <section id="outcome" className="py-24 sm:py-32 border-t border-[var(--line)] bg-moss relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">What you get</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display max-w-2xl chrome-text text-balance">
            The real result of the program isn't just a pretty face
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={(i % 2) * 0.05}>
              <div className="metallic-border rounded-2xl h-full p-6 sm:p-7 flex flex-col gap-3">
                <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">0{i + 1}</span>
                <h3 className="text-[16px] font-semibold tracking-tight">{it.t}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}