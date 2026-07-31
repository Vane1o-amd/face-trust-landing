import { Reveal } from "./Reveal";

const PHASES = [
  { weeks: "Недели 1–4", t: "Фундамент", d: "Снимаем отёки и зажимы, выстраиваем базу: сон, тонус, мимика, осанка." },
  { weeks: "Недели 5–8", t: "Контур и пропорции", d: "Работаем с овалом, симметрией и выражением. Лицо становится собранным." },
  { weeks: "Недели 9–11", t: "Присутствие", d: "Закрепляем результат: взгляд, уверенность, первое впечатление в кадре и в жизни." },
];

export function Timeline() {
  return (
    <section id="timeline" className="py-24 sm:py-32 border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            11 недель — путь к лицу, которое доверяют
          </h2>
        </Reveal>
        <div className="mt-14 grid lg:grid-cols-3 gap-4">
          {PHASES.map((p, i) => (
            <Reveal key={p.weeks} delay={i * 0.08}>
              <div className="metallic-border rounded-2xl h-full p-7 sm:p-8 flex flex-col">
                <span className="text-[13px] font-medium text-[var(--ink-soft)] whitespace-nowrap">{p.weeks}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">{p.d}</p>
                <div className="mt-auto pt-6 text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">этап 0{i + 1}/3</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
