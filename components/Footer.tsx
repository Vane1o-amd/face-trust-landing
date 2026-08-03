export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-24 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-20 w-20 object-contain rounded-full" />
          <span className="text-[16px] font-semibold chrome-text">Artur Ivashchenko</span>
        </div>
        <p className="hidden sm:block text-[14px] text-[var(--ink-soft)]">"A face worth trusting in 11 weeks" · {new Date().getFullYear()}</p>
        <p className="text-[14px] text-[var(--ink-soft)]">A personal program for men</p>
      </div>
    </footer>
  );
}
