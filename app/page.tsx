import { FileSearch, Gauge, PenLine, Target } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeatureCard } from "@/components/feature-card";
import { Reveal } from "@/components/reveal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="features" className="container-page py-28">
          <Reveal>
            <p className="text-sm font-medium text-violet-300">
              Built for focused applications
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Know what the role needs—and show why you’re ready.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0}>
              <FeatureCard icon={Gauge} title="Job Match Score">
                A clear, AI-generated signal with a concise explanation.
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.08}>
              <FeatureCard icon={Target} title="Missing keywords">
                See important and optional language your resume may be missing.
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.16}>
              <FeatureCard icon={FileSearch} title="Skill gap analysis">
                Separate strengths, missing skills, and practical improvements.
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.24}>
              <FeatureCard icon={PenLine} title="Tailored cover letter">
                Get a truthful first draft grounded in your own experience.
              </FeatureCard>
            </Reveal>
          </div>
        </section>
        <section id="how-it-works" className="container-page py-28">
          <div className="glass rounded-3xl p-7 sm:p-12">
            <Reveal>
              <p className="text-sm text-violet-300">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold">
                From PDF to plan in three steps.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                [
                  "01",
                  "Upload your resume",
                  "Choose a text-based PDF up to 5 MB.",
                ],
                [
                  "02",
                  "Add the opportunity",
                  "Paste the job description and optional context.",
                ],
                [
                  "03",
                  "Use your strategy",
                  "Review gaps, keywords, and your tailored letter.",
                ],
              ].map(([n, t, d], i) => (
                <Reveal key={n} delay={i * 0.1}>
                  <div>
                    <span className="text-xs text-zinc-600">{n}</span>
                    <h3 className="mt-3 font-medium">{t}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="container-page pb-28">
          <Reveal>
            <div className="glass rounded-3xl px-6 py-14 text-center sm:px-12">
              <h2 className="text-3xl font-semibold">
                Make your next application count.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                Turn the role’s requirements into a focused, evidence-based
                application strategy.
              </p>
              <Link href="/analyse" className="button-primary mt-7">
                Analyse my resume
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="border-t border-white/10">
        <Reveal>
          <div className="container-page flex flex-col gap-3 py-8 text-xs text-zinc-600 sm:flex-row sm:justify-between">
            <p>© 2026 OfferPilot AI</p>
            <p>AI guidance, not a guarantee of hiring outcomes.</p>
          </div>
        </Reveal>
      </footer>
    </>
  );
}
