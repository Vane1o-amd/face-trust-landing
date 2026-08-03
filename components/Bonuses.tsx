import { Reveal } from "./Reveal";

const BONUSES = [
  { t: "Персональная 5-минутная утренняя разминка", price: "$200", d: "Создаётся лично под ваши особенности тела, подвижность и образ жизни. Помогает быстрее проснуться, убрать скованность и подготовить тело к дню." },
  { t: "Персональный протокол витаминов и БАДов", price: "$350", d: "Только то, что действительно имеет смысл именно для вас. Без десятков ненужных банок и лишних расходов." },
  { t: "Система, которая поможет полюбить тренировки", price: "$1 000", d: "Подбираем активность, которая подходит именно вам. Цель — сделать так, чтобы спорт перестал быть обязанностью и стал частью образа жизни." },
  { t: "«Жизнь без ограничений» — социальная система питания", price: "$349", d: "Как ходить в рестораны. Как посещать дни рождения. Как путешествовать. Как худеть, не чувствуя себя изолированным от общества." },
  { t: "Персональный план питания для тех, кто постоянно в дороге", price: "$400", d: "Для предпринимателей. Для командировок. Для тех, кто не любит готовить. Что покупать в супермаркете. Что заказывать в ресторане." },
  { t: "Персональный план снижения процента жира", price: "$649", d: "Без запрета любимой еды. Без постоянного подсчёта калорий. Используя любимый вид спорта." },
  { t: "Система выразительного лица", price: "$1 200", d: "Как уменьшить отёчность. Как улучшить качество кожи. Как сделать лицо более выразительным. Персональный уход, который занимает около 10 минут в день." },
];

export function Bonuses() {
  return (
    <section id="bonuses" className="py-24 sm:py-32 border-t border-[var(--line)] bg-stone">
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
              <div className="metallic-border h-full rounded-2xl p-7 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">+ бонус 0{i + 1}</span>
                  <span className="text-[13px] font-semibold text-amber whitespace-nowrap">{b.price}</span>
                </div>
                <h3 className="text-[17px] font-semibold tracking-tight">{b.t}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--ink-soft)]">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8 metallic-border rounded-2xl p-8 sm:p-10 text-center glow">
            <p className="text-[14px] font-medium uppercase tracking-wider text-[var(--ink-soft)] line-through decoration-[var(--ink-soft)] decoration-1">Общая стоимость $4 149</p>
            <p className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight-display chrome-text">
              Всё это вы получаете за $500
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] max-w-xl mx-auto">
              Вместо полной цены — только один платёж, и все семь бонусов входят в программу.
            </p>
            <a href="#lead" className="chrome-btn mt-7 inline-flex rounded-full text-[15px] font-semibold px-6 py-3.5 transition whitespace-normal">
              Записаться на диагностику
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}