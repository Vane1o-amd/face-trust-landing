import { Reveal } from "./Reveal";

const ITEMS = [
  { t: "Просыпаетесь уже включённым", d: "Без тяжести в теле и тумана в голове. 10 минут — и у вас мощный заряд до самого вечера." },
  { t: "Ощущение превосходства", d: "Когда вы смотрите в зеркало или на своё фото с видеовстречи. Взгляд, с которым заходят в кабинет владельцы бизнеса." },
  { t: "Полная свобода от быта", d: "Вы всегда идеально сыты, едите еду ресторанного уровня в любой точке мира, не потратив на это ни минуты личного времени." },
  { t: "Абсолютная чистота и здоровье изнутри", d: "Ваша кожа и тело работают на 100% без «костылей» и лишней фармакологии." },
  { t: "Азарт и кайф от движения", d: "Вместо дисциплинарной каторги. Вы занимаетесь тем, что любите, а тело само становится сухим и атлетичным." },
  { t: "Спокойствие за свой результат", d: "Вся система работает как швейцарские часы на автопилоте, освобождая вашу голову для масштабных задач." },
];

export function Outcome() {
  return (
    <section id="outcome" className="py-24 sm:py-32 border-t border-[var(--line)] bg-moss relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-0 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px] blob-moss" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Что вы получаете</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display max-w-2xl chrome-text text-balance">
            Главный результат программы — не просто «красивое лицо»
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={(i % 2) * 0.05}>
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