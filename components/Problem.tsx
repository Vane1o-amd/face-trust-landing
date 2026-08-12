import { Reveal } from "./Reveal";

const ITEMS = [
  { t: "Dark circles and puffiness", d: "People read that something is off before you even start talking. It's harder to trust you, unpleasant to deal with you, you get fewer good opportunities — and the results are worse." },
  { t: "Facial asymmetry", d: "Asymmetry distorts proportions, and a wrong haircut exposes every flaw and makes you look foolish in others' eyes. Instead of respect — laughter and rejection." },
  { t: "Acne, hair, teeth, smell", d: "Acne, hair loss, bad teeth, you stink. Fast food, dehydration, sauces — you eat food that makes you weak. All health starts from within." },
  { t: "Round face, excess fat, stiffness", d: "A sedentary lifestyle and a pile of health problems. Sport takes a lot of time, and you simply can't train enough." },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 sm:py-32 border-t border-[var(--line)] bg-stone">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--ink-soft)]">Sound familiar?</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight-display max-w-2xl chrome-text text-balance">
            Why your face isn't working for you
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
            A first impression forms in seconds. We make your appearance start working for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
