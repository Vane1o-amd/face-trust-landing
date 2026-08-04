import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="pt-36 pb-20 sm:pt-44 sm:pb-28 relative overflow-hidden bg-moss">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight-display leading-[1.04] chrome-text text-balance">
              A face worth trusting in 11 weeks
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 max-w-xl space-y-4">
              <p className="text-[17px] leading-relaxed text-[var(--ink-soft)]">
                A personal program for entrepreneurs and ambitious men who want to look as expensive as their ambitions.
              </p>
              <ul className="space-y-2 text-[15px] text-[var(--ink)]">
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
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#lead" className="chrome-btn rounded-full text-[15px] font-semibold px-6 py-3.5 text-center transition whitespace-normal">Get a free diagnosis</a>
              <a href="#program" className="ghost-btn rounded-full text-[15px] font-medium px-6 py-3.5 text-center transition whitespace-normal">How the program works</a>
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
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--bg-card)] metallic-border glow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/before/before-hero.png" alt="Artur Ivashchenko — appearance work" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="text-[11px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur text-white rounded-full px-2.5 py-1 border border-white/10">Before the program</span>
        </div>
      </div>
    </div>
  );
}