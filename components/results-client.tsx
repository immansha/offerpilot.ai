"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { analysisSchema } from "@/lib/schemas";
import type { AnalysisResult } from "@/types/analysis";
import { MatchScore } from "@/components/match-score";
import { KeywordList } from "@/components/keyword-list";
import { SkillGap } from "@/components/skill-gap";
import { CoverLetter } from "@/components/cover-letter";
import { LoadingAnalysis } from "@/components/loading-analysis";
import { ErrorState } from "@/components/error-state";
import { Reveal } from "@/components/reveal";

export function ResultsClient() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string>();
  const [context, setContext] = useState<{
    jobTitle?: string;
    companyName?: string;
  }>({});
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("offerpilot-result");
      if (!raw)
        throw new Error("No saved result was found in this browser session.");
      setResult(analysisSchema.parse(JSON.parse(raw)));
      const savedContext = sessionStorage.getItem("offerpilot-context");
      if (savedContext)
        setContext(
          JSON.parse(savedContext) as {
            jobTitle?: string;
            companyName?: string;
          },
        );
    } catch (e) {
      setError(e instanceof Error ? e.message : "This result is invalid.");
    } finally {
      setReady(true);
    }
  }, []);
  if (!ready) return <LoadingAnalysis />;
  if (!result) return <ErrorState message={error} />;
  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
          >
            <Home size={15} /> Home
          </Link>
          <Link
            href="/analyse"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
          >
            <ArrowLeft size={15} /> Analyse another job
          </Link>
        </div>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="text-violet-300" size={16} /> OfferPilot AI
        </span>
      </div>
      <div className="mb-7">
        <p className="text-sm font-medium text-violet-300">Your analysis</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {context.jobTitle || "A clearer path to a stronger application."}
        </h1>
        {context.companyName && (
          <p className="mt-2 text-sm text-zinc-500">{context.companyName}</p>
        )}
      </div>
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/[.06] p-4 text-sm text-rose-200"
        >
          {error}
        </div>
      )}
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <MatchScore
            score={result.matchScore}
            explanation={result.scoreExplanation}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <KeywordList {...result.missingKeywords} />
        </Reveal>
      </div>
      <Reveal delay={0.12} className="mt-5">
        <SkillGap data={result.skillGapAnalysis} />
      </Reveal>
      <Reveal delay={0.16} className="mt-5">
        <CoverLetter letter={result.coverLetter} />
      </Reveal>
    </main>
  );
}
