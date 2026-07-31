import { Reveal } from "./Reveal";

const ITEMS = [
  { t: "Тёмные круги и усталый взгляд", d: "Лицо выглядит старше возраста. Окружающие считывают усталость и неуверенность." },
  { t: "Отёки и тяжёлый овал", d: "Мягкие контуры размывают линию челюсти. На фото и в жизни — эффект «сонного» лица." },
  { t: "Асимметрия и напряжение", d: "Мимические блоки и зажимы искажают пропорции. Это первое, что видит собеседник." },
  { t: "Нет выражения статуса", d: "Внешность не передаёт достоинства и силы. Теряете доверие на первом впечатлении." },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 sm:py-32 border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Знакомо?</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display max-w-2xl chrome-text">
            Почему лицо «не работает» на вас
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.05}>
              <div className="metallic-border rounded-2xl h-full p-6 sm:p-7 flex flex-col gap-3">
                <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">0{i + 1}</span>
                <h3 className="text-[16px] font-semibold tracking-tight">{it.t}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
