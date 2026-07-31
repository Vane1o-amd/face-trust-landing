import { Reveal } from "./Reveal";

export function Guarantee() {
  return (
    <section id="guarantee" className="py-24 sm:py-32 bg-black text-white border-t border-[var(--line)] relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(160,160,175,0.18), transparent 70%)" }} />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <Reveal>
          <span className="text-[13px] font-medium uppercase tracking-wider text-white/50">Гарантия</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight-display leading-[1.08] chrome-text">
            Если за 11 недель вы не увидите перемен — я вернусь и доработаю лично
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 text-[17px] leading-relaxed text-white/70 max-w-2xl mx-auto">
            Я беру на себя результат. Если прогресс не заметен — продолжаем
            работу бесплатно, пока вы его не увидите. Это не маркетинг, это моя
            ответственность.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <a href="#lead" className="chrome-btn mt-9 inline-flex rounded-full text-[15px] font-semibold px-6 py-3.5 transition">
            Начать с бесплатной диагностики
          </a>
        </Reveal>
      </div>
    </section>
  );
}
