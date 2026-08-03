"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type Detail = {
  groups: { label: string | null; items: string[] }[];
  closing: string;
};

type Step = {
  n: number;
  weeks: string;
  t: string;
  d: string;
  detail: Detail;
};

const STEPS: Step[] = [
  {
    n: 1,
    weeks: "Неделя 1",
    t: "Диагностика и стратегия",
    d: "Проводим полный анализ лица, тела и образа жизни. Определяем главные причины, которые мешают вам выглядеть лучше, и составляем персональный план трансформации.",
    detail: {
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
      ],
      closing: "На основе аудита строим персональный план трансформации под ваш график и цели.",
    },
  },
  {
    n: 2,
    weeks: "Недели 2–4",
    t: "Создание фундамента",
    d: "Постепенно встраиваем простую систему в вашу жизнь — без жёстких ограничений и лишних усилий.",
    detail: {
      groups: [
        {
          label: null,
          items: [
            "уход за лицом — простой и достаточно эффективный;",
            "БАДы под ваш ритм и стиль жизни;",
            "режим сна, привязанный к вашему графику;",
            "система, которая занимает минимум времени и не отвлекает от дел;",
            "питание без жёстких ограничений — можно есть в ресторане и не готовить каждый день.",
          ],
        },
      ],
      closing: "Мы корректируем уже существующий фундамент. К 4-й неделе окружающие видят значительные изменения: вы узнаёте результат по их реакции раньше, чем по зеркалу.",
    },
  },
  {
    n: 3,
    weeks: "Недели 5–8",
    t: "Формирование выразительного лица",
    d: "Усиливаем результат: уменьшаем отёчность, снижаем процент жира, улучшаем кожу, волосы и детали внешности.",
    detail: {
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
      closing: "Здесь мы усиливаем контуры и детали, которые и формируют «дорогое» лицо.",
    },
  },
  {
    n: 4,
    weeks: "Недели 9–11",
    t: "Закрепление и автоматизация",
    d: "Закрепляем результат, автоматизируем все привычки и создаём систему, которой легко придерживаться годами.",
    detail: {
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
  },
];

export function ProgramContents() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section id="program" className="py-24 sm:py-32 bg-[var(--bg-soft)] border-t border-[var(--line)] relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Ваш путь за 11 недель</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            Программа «Лицо, которому доверяют»
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <Reveal key={s.n} delay={(i % 4) * 0.05}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`metallic-border h-full rounded-2xl p-6 flex flex-col gap-3 text-left transition-colors w-full ${
                    isActive ? "ring-2 ring-[var(--ink)]/25 bg-black/[0.04]" : "hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">0{s.n}/4</span>
                    <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-black/[0.02] px-2.5 py-1">{s.weeks}</span>
                  </div>
                  <h3 className="text-[17px] font-semibold tracking-tight">{s.t}</h3>
                  <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{s.d}</p>
                  <span className="mt-auto pt-2 text-[13px] font-medium text-emerald-700">
                    {isActive ? "Открыто ↓" : "Подробнее →"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal key={active} delay={0.02}>
          <div className="mt-6 metallic-border rounded-2xl p-7 sm:p-9">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-[13px] font-mono text-[var(--ink-soft)]">Этап 0{step.n}/4</span>
              <span className="text-[12px] font-medium uppercase tracking-wider text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-black/[0.02] px-2.5 py-1">{step.weeks}</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight chrome-text">{step.t}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink-soft)] max-w-2xl">{step.d}</p>
            {step.detail.groups.map((g, gi) => (
              <div key={gi} className="mt-5">
                {g.label && <p className="text-[15px] font-medium text-[var(--ink)]">{g.label}</p>}
                <ul className="mt-2 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {g.items.map((it, ii) => (
                    <li key={ii} className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--ink-soft)]">
                      <span aria-hidden className="text-emerald-700 mt-0.5">—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink)] italic max-w-2xl">{step.detail.closing}</p>
          </div>
        </Reveal>

        <p className="mt-6 text-[14px] text-[var(--ink-soft)]">
          11 недель — путь к лицу, которому доверяют. Нажмите на любой этап выше, чтобы увидеть, что именно происходит на этой стадии.
        </p>
      </div>
    </section>
  );
}