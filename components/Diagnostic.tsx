import { Reveal } from "./Reveal";

const STEPS = [
  { t: "Фото- и видео-анализ", d: "Разбираю пропорции, мимику, симметрию и динамику лица в покое и в движении." },
  { t: "Карта приоритетов", d: "Определяю, что именно мешает лицу выглядеть дорого — от тонуса до привычек." },
  { t: "Персональный план", d: "Конкретные шаги на 11 недель под ваш тип лица, образ жизни и цели." },
];

export function Diagnostic() {
  return (
    <section id="diagnostic" className="py-24 sm:py-32 bg-[var(--bg-soft)] border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
              Бесплатная персональная диагностика
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[17px] leading-relaxed text-[var(--ink-soft)] max-w-lg">
              Один час внимания к вашему лицу. Без общих советов — только то, что
              работает конкретно для вас. По итогу вы получите план, даже если
              решите не идти в программу.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#lead" className="chrome-btn mt-8 inline-flex rounded-full text-[15px] font-semibold px-6 py-3.5 transition whitespace-normal">
              Записаться на диагностику
            </a>
          </Reveal>
        </div>
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.07}>
              <div className="metallic-border rounded-2xl p-6 flex gap-4">
                <span className="text-[13px] font-mono text-[var(--ink-soft)] mt-0.5 whitespace-nowrap">0{i + 1}</span>
                <div>
                  <h3 className="text-[16px] font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ink-soft)]">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
