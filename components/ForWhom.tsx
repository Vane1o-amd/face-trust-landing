import { Reveal } from "./Reveal";

const ITEMS = [
  "Владельцам бизнеса",
  "Предпринимателям",
  "Инвесторам",
  "Брокерам",
  "Риэлторам",
  "Директорам",
  "Мужчинам с высоким темпом жизни и амбициями",
];

export function ForWhom() {
  return (
    <section id="for-whom" className="py-24 sm:py-32 border-t border-[var(--line)] bg-stone">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Для кого</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display max-w-2xl chrome-text text-balance">
            Кому подойдет программа
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it} delay={(i % 3) * 0.05}>
              <div className="metallic-border rounded-2xl h-full p-6 flex items-center gap-3">
                <span aria-hidden className="text-emerald-700 text-lg leading-none">●</span>
                <span className="text-[15px] font-medium tracking-tight">{it}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}