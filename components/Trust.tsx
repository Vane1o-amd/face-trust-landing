import { Reveal } from "./Reveal";

const POINTS = [
  "Всё строится под конкретного человека",
  "Программа адаптируется под график, поездки, питание и привычки",
  "Не нужен час в день на уход",
  "Не нужна жёсткая диета",
  "Не нужен хаос из советов",
];

const PAIRS = [
  { before: "/before/before-1.jpg", after: null as string | null },
  { before: "/before/before-2.jpg", after: null as string | null },
  { before: "/before/before-3.jpg", after: null as string | null },
];

export function Trust() {
  return (
    <section id="trust" className="py-24 sm:py-32 border-t border-[var(--line)] bg-[var(--bg-soft)] relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Блок доверия</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display max-w-2xl chrome-text text-balance">
            Почему это работает
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
            {POINTS.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-[16px] leading-relaxed text-[var(--ink)]">
                <span aria-hidden className="text-emerald-700 mt-0.5">—</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-3 gap-5">
          {PAIRS.map((pair, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="metallic-border rounded-2xl p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--bg-card)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pair.before} alt="До программы" className="absolute inset-0 h-full w-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur text-white rounded-full px-2 py-0.5 border border-white/10">До</span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--bg-card)] border border-dashed border-[var(--line)] flex items-center justify-center">
                    {pair.after ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pair.after} alt="После программы" className="absolute inset-0 h-full w-full object-cover" />
                        <span className="absolute top-2 left-2 text-[10px] font-medium uppercase tracking-wider bg-black/60 backdrop-blur text-white rounded-full px-2 py-0.5 border border-white/10">После</span>
                      </>
                    ) : (
                      <span className="text-[12px] text-[var(--ink-soft)] text-center px-3">После<br />(фото скоро)</span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}