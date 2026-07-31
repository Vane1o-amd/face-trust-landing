import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="pt-36 pb-20 sm:pt-44 sm:pb-28 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full opacity-40 blur-[120px]" style={{ background: "radial-gradient(closest-side, rgba(150,150,165,0.35), transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-white/[0.02] px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Набор открыт · 3 места в месяц
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight-display leading-[1.04] chrome-text text-balance">
              Лицо, которому доверяют за 11 недель
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] leading-relaxed text-[var(--ink-soft)] max-w-xl">
              Персональная программа для мужчин, которые хотят выглядеть дорого,
              уверенно и производить сильное первое впечатление.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#lead" className="chrome-btn rounded-full text-[15px] font-semibold px-6 py-3.5 text-center transition whitespace-normal">Получить бесплатную диагностику</a>
              <a href="#program" className="ghost-btn rounded-full text-[15px] font-medium px-6 py-3.5 text-center transition whitespace-normal">Как проходит программа</a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 text-[13px] text-[var(--ink-soft)] max-w-md">
              <div><span className="block text-[var(--ink)] text-xl sm:text-2xl font-semibold tracking-tight">11</span>недель работы</div>
              <div><span className="block text-[var(--ink)] text-xl sm:text-2xl font-semibold tracking-tight">1:1</span>сопровождение</div>
              <div><span className="block text-[var(--ink)] text-xl sm:text-2xl font-semibold tracking-tight">100%</span>конфиденциальность</div>
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
        <img src="/before/before-1.jpg" alt="Артур Иващенко — работа над внешностью" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="text-[11px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur text-white rounded-full px-2.5 py-1 border border-white/10">До старта программы</span>
        </div>
      </div>
    </div>
  );
}