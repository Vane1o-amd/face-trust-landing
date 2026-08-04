import { Reveal } from "./Reveal";

const POINTS = [
  "Everything is built for the specific person",
  "The program adapts to your schedule, travel, nutrition and habits",
  "You don't need an hour a day for care",
  "No strict diet required",
  "No chaos of conflicting advice",
];

const PAIRS = [
  { before: "/before/before-1.jpg", after: "/before/after-1.jpg" },
  { before: "/before/before-2.png", after: "/before/after-2.png" },
];

export function Trust() {
  return (
    <section id="trust" className="py-24 sm:py-32 border-t border-[var(--line)] bg-[var(--bg-soft)] relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Trust</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display max-w-2xl chrome-text text-balance">
            Why it works
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
            {POINTS.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-[16px] leading-relaxed text-[var(--ink)]">
                <span aria-hidden className="text-sky-700 mt-0.5">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-5 max-w-3xl">
          {PAIRS.map((pair, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="metallic-border rounded-2xl p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--bg-card)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pair.before} alt="Before the program" className="absolute inset-0 h-full w-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur text-white rounded-full px-2 py-0.5 border border-white/10">Before</span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--bg-card)] border border-dashed border-[var(--line)] flex items-center justify-center">
                    {pair.after ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pair.after} alt="After the program" className="absolute inset-0 h-full w-full object-cover" />
                        <span className="absolute top-2 left-2 text-[10px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur text-white rounded-full px-2 py-0.5 border border-white/10">After</span>
                      </>
                    ) : (
                      <span className="text-[12px] text-[var(--ink-soft)] text-center px-3">After<br />(photo soon)</span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}