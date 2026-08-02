import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Outcome } from "@/components/Outcome";
import { Diagnostic } from "@/components/Diagnostic";
import { Timeline } from "@/components/Timeline";
import { ProgramContents } from "@/components/ProgramContents";
import { Bonuses } from "@/components/Bonuses";
import { Guarantee } from "@/components/Guarantee";
import { Scarcity } from "@/components/Scarcity";
import { Faq } from "@/components/Faq";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Outcome />
        <Diagnostic />
        <Timeline />
        <ProgramContents />
        <Bonuses />
        <Guarantee />
        <Scarcity />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
