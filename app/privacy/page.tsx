import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — A face worth trusting",
  description:
    "How we collect, use, store and delete personal and biometric data for the free face diagnosis.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-28 sm:py-36">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text">
          Privacy Policy
        </h1>
        <p className="mt-4 text-[15px] text-[var(--ink-soft)]">
          Last updated: August 2026
        </p>

        <section className="mt-10 space-y-6 text-[15px] leading-relaxed text-[var(--ink-soft)]">
          <div>
            <h2 className="text-lg font-semibold text-[var(--ink)]">1. What we collect</h2>
            <p className="mt-2">
              When you request a free face diagnosis we collect your name, Telegram
              username, optional Instagram username, your description of the concern,
              and front/side face photos. The face photos are biometric data under
              GDPR Article 9.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[var(--ink)]">2. How we use it</h2>
            <p className="mt-2">
              The information is used only to assess your request, prepare a personal
              recommendation and contact you on Telegram. We do not use the photos for
              advertising, training, or any automated decision-making.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[var(--ink)]">3. How we share it</h2>
            <p className="mt-2">
              Your data is transferred to a private Telegram chat so the consultant can
              review it. No third-party analytics, advertising or tracking services are
              used on this site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[var(--ink)]">4. How long we keep it</h2>
            <p className="mt-2">
              We keep your data for up to 30 days after the final reply, unless you ask
              us to delete it earlier. After 30 days the photos and message history are
              permanently removed from the Telegram chat and backups.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[var(--ink)]">5. Your rights</h2>
            <p className="mt-2">
              You can ask to access, correct, restrict or delete your data at any time
              by contacting us on Telegram. You can also withdraw your consent, in which
              case we stop processing and delete your data as soon as possible.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[var(--ink)]">6. Contact</h2>
            <p className="mt-2">
              Artur Ivashchenko — Telegram: contact via the application form on this
              site.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
