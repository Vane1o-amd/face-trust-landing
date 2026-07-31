import { Reveal } from "./Reveal";

const BLOCKS = [
  { t: "Анализ лица", d: "Фото, видео, пропорции, мимические блоки, привычки." },
  { t: "Работа с тонусом", d: "Снижение отёков, восстановление микроциркуляции, ровный тон." },
  { t: "Мимика и выражение", d: "Снимаем зажимы. Лицо становится живым и спокойным одновременно." },
  { t: "Контур и овал", d: "Собранный овал, линия челюсти, симметрия без вмешательств." },
  { t: "Взгляд и присутствие", d: "Глаза, которые не выглядят уставшими. Взгляд, которому доверяют." },
  { t: "Привычки и поддержка", d: "Простые ритуалы на каждый день. Результат, который остаётся." },
];

export function ProgramContents() {
  return (
    <section id="program" className="py-24 sm:py-32 bg-[var(--bg-soft)] border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Что внутри</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            Программа «Лицо, которому доверяют»
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.t} delay={(i % 3) * 0.05}>
              <div className="metallic-border h-full rounded-2xl p-7 flex flex-col gap-3 transition">
                <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">0{i + 1}</span>
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
