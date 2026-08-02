import { Reveal } from "./Reveal";

type Phase = {
  n: number;
  weeks: string;
  t: string;
  intro: string;
  groups: { label: string | null; items: string[] }[];
  closing: string;
};

const PHASES: Phase[] = [
  {
    n: 1,
    weeks: "1–4 неделя",
    t: "Фундамент",
    intro: "На этом этапе мы создаём основу всей трансформации.",
    groups: [
      {
        label: "Сначала мы проводим глубокий аудит:",
        items: [
          "причёска и состояние волос;",
          "анализ лица и тела;",
          "анализ образа жизни;",
          "разбор рабочего графика;",
          "анализ питания;",
          "анализ сна;",
          "анализ уровня активности;",
          "выявление привычек и слабых мест;",
          "определение точки А и желаемого результата.",
        ],
      },
      {
        label: "После этого постепенно внедряем систему в вашу жизнь:",
        items: [
          "корректируем питание без жёстких ограничений;",
          "подбираем удобный формат физической активности;",
          "внедряем простой уход за лицом;",
          "настраиваем режим воды и сна;",
          "подбираем необходимые БАДы;",
          "создаём систему, которая требует минимум времени и не мешает работе.",
        ],
      },
    ],
    closing: "Цель этапа — создать фундамент, который станет частью вашего образа жизни.",
  },
  {
    n: 2,
    weeks: "5–8 неделя",
    t: "Контур пропорций",
    intro: "К этому моменту организм уже адаптировался к новой системе, и появляются заметные изменения. Мы начинаем усиливать результат:",
    groups: [
      {
        label: null,
        items: [
          "уменьшаем отёчность;",
          "делаем лицо более выразительным;",
          "улучшаем качество кожи;",
          "работаем над процентом жира;",
          "усиливаем контуры лица;",
          "корректируем детали, которые дают максимальный визуальный эффект;",
          "продолжаем адаптировать систему под ваш образ жизни.",
        ],
      },
    ],
    closing: "Именно на этом этапе большинство клиентов впервые замечают, что их внешность действительно меняется.",
  },
  {
    n: 3,
    weeks: "9–11 неделя",
    t: "Присутствие",
    intro: "Последний этап посвящён закреплению результата. Наша задача — сделать так, чтобы новый внешний вид сохранялся без постоянного самоконтроля. Мы:",
    groups: [
      {
        label: null,
        items: [
          "закрепляем все привычки;",
          "автоматизируем питание, уход и тренировки;",
          "составляем долгосрочный план поддержки;",
          "устраняем последние слабые места;",
          "формируем систему, которой легко придерживаться даже при высокой занятости и частых путешествиях.",
        ],
      },
    ],
    closing: "К концу программы вы получаете не временный результат, а систему, которую сможете поддерживать годами без ощущения, что живёте «по программе».",
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="py-24 sm:py-32 border-t border-[var(--line)] bg-moss">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            11 недель — путь к лицу, которое доверяют
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-col gap-4">
          {PHASES.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="metallic-border rounded-2xl p-7 sm:p-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-[13px] font-mono text-[var(--ink-soft)]">Этап 0{p.n}/3</span>
                  <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-white/[0.02] px-2.5 py-1">{p.weeks}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight chrome-text">{p.t}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-soft)] max-w-2xl">{p.intro}</p>
                {p.groups.map((g, gi) => (
                  <div key={gi} className="mt-5">
                    {g.label && <p className="text-[15px] font-medium text-[var(--ink)]">{g.label}</p>}
                    <ul className="mt-2 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                      {g.items.map((it, ii) => (
                        <li key={ii} className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--ink-soft)]">
                          <span aria-hidden className="text-emerald-400 mt-0.5">—</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink)] italic max-w-2xl">{p.closing}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}