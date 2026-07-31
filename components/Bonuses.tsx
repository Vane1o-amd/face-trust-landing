import { Reveal } from "./Reveal";

const BONUSES = [
  { t: "Гайд «Сон, который делает лицо», $49", d: "Протокол восстановления за 7 дней: отёки, тонус, ровный тон." },
  { t: "Видео-разбор «Первое впечатление», $129", d: "Как вы выглядите в первые 3 секунды — и что это говорит собеседнику." },
  { t: "Чек-лист перед съёмкой, $79", d: "25 пунктов, чтобы лицо работало в кадре и на встрече." },
  { t: "Личный чат с куратором, $3 700", d: "Поддержка и ответы между сессиями. Полная включённость в результат." },
];

export function Bonuses() {
  return (
    <section id="bonuses" className="py-24 sm:py-32 border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Бонусы</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            Дополнительно на сумму более $4 000
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {BONUSES.map((b, i) => (
            <Reveal key={b.t} delay={(i % 2) * 0.06}>
              <div className="metallic-border h-full rounded-2xl p-7 flex flex-col gap-2.5">
                <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">+ бонус 0{i + 1}</span>
                <h3 className="text-[17px] font-semibold tracking-tight">{b.t}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
