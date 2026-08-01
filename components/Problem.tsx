import { Reveal } from "./Reveal";

const ITEMS = [
  { t: "Тёмные круги и отёки", d: "Окружающие считывают, что с человеком что-то не так, ещё до того, как вы начали говорить. Вам сложнее довериться, с вами неприятно общаться, вы получаете меньше хороших возможностей — и результат хуже." },
  { t: "Асимметрия лица", d: "Асимметрия искажает пропорции, а неправильно подобранная стрижка показывает все ваши недостатки и делает вас глупым в глазах окружающих. Вместо уважения — смех и отвержение." },
  { t: "Прыщи, волосы, зубы, запах", d: "Прыщи, выпадение волос, проблемы с зубами, вы воняете. Фастфуд, обезвоживание, соусы — вы едите еду, которая делает вас слабым. Всё здоровье начинается изнутри." },
  { t: "Круглое лицо, лишний жир, зажатость", d: "Пассивный образ жизни и куча проблем со здоровьем. Спорт занимает кучу времени, и вы просто не успеваете заниматься достаточно." },
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
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
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
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[17px] leading-relaxed text-[var(--ink)]">
            Первое впечатление формируется за секунды. Мы делаем так, чтобы ваша внешность начала работать на вас.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
