import { Reveal } from "./Reveal";

const BONUSES = [
  { t: "Personal 5-minute morning warm-up", price: "$200", d: "Built for your body, mobility and lifestyle. Helps you wake up faster, release stiffness and prepare your body for the day." },
  { t: "Personal vitamin and supplement protocol", price: "$350", d: "Only what actually makes sense for you. No dozens of unnecessary jars and extra costs." },
  { t: "A system that helps you love training", price: "$1 000", d: "We pick an activity that suits you. The goal is to make sport stop being a duty and become part of your lifestyle." },
  { t: "\"Life without limits\" — nutrition without stepping away from life", price: "$749", d: "How to go to restaurants, attend birthdays and travel while losing weight without feeling isolated from society. A personal plan for entrepreneurs and business trips: what to buy at the supermarket and what to order at a restaurant if you don't like to cook." },
  { t: "Personal body-fat reduction plan", price: "$649", d: "Without banning your favorite foods. Without constant calorie counting. Using the sport you love." },
  { t: "Expressive face system", price: "$1 200", d: "How to reduce puffiness. How to improve skin quality. How to make your face more expressive. Personal care that takes about 10 minutes a day." },
];

export function Bonuses() {
  return (
    <section id="bonuses" className="py-24 sm:py-32 border-t border-[var(--line)] bg-stone">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Bonuses</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
            Plus over <span className="whitespace-nowrap">$4 000</span> in extras
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {BONUSES.map((b, i) => (
            <Reveal key={b.t} delay={(i % 2) * 0.06}>
              <div className="metallic-border h-full rounded-2xl p-7 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12px] font-mono text-[var(--ink-soft)] whitespace-nowrap">+ bonus 0{i + 1}</span>
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
            <p className="text-[14px] font-medium uppercase tracking-wider text-[var(--ink-soft)] line-through decoration-[var(--ink-soft)] decoration-1">Total value $4 149</p>
            <p className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight-display chrome-text">
              You get all of it for $500
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] max-w-xl mx-auto">
              Instead of the full price — just one payment, and all six bonuses are included in the program.
            </p>
            <a href="#lead" className="chrome-btn mt-7 inline-flex rounded-full text-[15px] font-semibold px-6 py-3.5 transition whitespace-normal">
              Book a diagnosis
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}