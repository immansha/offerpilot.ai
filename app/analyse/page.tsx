import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { JobForm } from "@/components/job-form";

export default function AnalysePage() {
  return (
    <main className="container-page py-8 sm:py-12">
      <div className="mb-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
        >
          <ArrowLeft size={15} /> Back
        </Link>
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="text-violet-300" size={16} /> OfferPilot AI
        </span>
      </div>
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-300">Resume analysis</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Build your interview strategy.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
          We’ll compare the language and evidence in your resume against the
          role. Results are AI-generated guidance, not a real ATS score.
        </p>
      </div>
      <JobForm />
    </main>
  );
}
