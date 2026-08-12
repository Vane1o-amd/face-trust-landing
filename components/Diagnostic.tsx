import { Reveal } from "./Reveal";

const STEPS = [
  { t: "Getting to know you", d: "We get to know you, your life, habits, nutrition and activity." },
  { t: "Photo and video analysis", d: "You send front and side face photos and a short video. I create a visualization of the result and build an improvement plan." },
  { t: "Call and start", d: "We get on a call, I present the plan, align it with your schedule and start the work." },
];

export function Diagnostic() {
  return (
    <section id="diagnostic" className="py-24 sm:py-32 bg-sand border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text text-balance">
              15–20 minutes of attention to your face
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-[17px] leading-relaxed text-[var(--ink-soft)] max-w-lg">
              We'll look at your strengths and weaknesses and build an 11-week
              development strategy.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#lead" className="chrome-btn mt-8 inline-flex rounded-full text-[15px] font-semibold px-6 py-3.5 transition whitespace-normal">
              Book a diagnosis
            </a>
          </Reveal>
        </div>
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.07}>
              <div className="metallic-border rounded-2xl p-6 flex gap-4">
                <span className="text-[13px] font-mono text-[var(--ink-soft)] mt-0.5 whitespace-nowrap">0{i + 1}</span>
                <div>
                  <h3 className="text-[16px] font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ink-soft)]">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
