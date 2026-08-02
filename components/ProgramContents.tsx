import { Reveal } from "./Reveal";

const STEPS = [
  { n: 1, weeks: "Неделя 1", t: "Диагностика и стратегия", d: "Проводим полный анализ лица, тела и образа жизни. Определяем главные причины, которые мешают вам выглядеть лучше, и составляем персональный план трансформации." },
  { n: 2, weeks: "Недели 2–4", t: "Создание фундамента", d: "Постепенно внедряем питание, любимый спорт, сон, уход, БАДы и полезные привычки. Всё максимально просто, удобно и без лишних ограничений." },
  { n: 3, weeks: "Недели 5–8", t: "Формирование выразительного лица", d: "Усиливаем результат: уменьшаем отёчность, снижаем процент жира, улучшаем кожу, волосы и детали внешности. Именно на этом этапе изменения становятся заметны окружающим." },
  { n: 4, weeks: "Недели 9–11", t: "Закрепление и автоматизация", d: "Закрепляем результат, автоматизируем все привычки и создаём систему, которой легко придерживаться годами. Вы получаете персональный план поддержки и календарь ухода, чтобы сохранять внешний вид без постоянного самоконтроля." },
];

export function ProgramContents() {
  return (
    <section id="program" className="py-24 sm:py-32 bg-[var(--bg-soft)] border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Ваш путь за 11 недель</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            Программа «Лицо, которому доверяют»
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 0.05}>
              <div className="metallic-border h-full rounded-2xl p-7 flex flex-col gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">0{s.n}/4</span>
                  <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-white/[0.02] px-2.5 py-1">{s.weeks}</span>
                </div>
                <h3 className="text-[18px] font-semibold tracking-tight">{s.t}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}