import { Reveal } from "./Reveal";

export function Guarantee() {
  return (
    <section id="guarantee" className="py-24 sm:py-32 bg-moss text-[var(--ink)] border-t border-[var(--line)] relative overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <Reveal>
          <span className="text-[13px] font-medium uppercase tracking-wider text-amber">Guarantee</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight-display leading-[1.08] chrome-text">
            If you don't see change in 11 weeks — I come back and finish it personally
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 text-[17px] leading-relaxed text-[var(--ink-soft)] max-w-2xl mx-auto">
            I own the result. If progress isn't visible — we keep working
            for free until you see it. This isn't marketing, it's my
            responsibility.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a href="#lead" className="chrome-btn mt-9 inline-flex rounded-full text-[15px] font-semibold px-6 py-3.5 transition whitespace-normal">
            Start with a free diagnosis
          </a>
        </Reveal>
      </div>
    </section>
  );
}
