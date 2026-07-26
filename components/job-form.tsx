"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";
import type { z } from "zod";
import { analysisSchema, formSchema } from "@/lib/schemas";
import { extractPdfText } from "@/lib/pdf-parser";
import { ResumeUpload, validateResume } from "@/components/resume-upload";

type Values = z.infer<typeof formSchema>;

export function JobForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [submitError, setSubmitError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Values>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { jobDescription: "", jobTitle: "", companyName: "" },
  });
  const jobDescription = watch("jobDescription");

  const submit = async (values: Values) => {
    const invalid = validateResume(file ?? undefined);
    setFileError(invalid ?? undefined);
    setSubmitError(undefined);
    if (invalid || !file) return;
    setBusy(true);
    try {
      const resumeText = await extractPdfText(file);
      if (resumeText.length < 50)
        throw new Error(
          "We could not extract text from this PDF. Please upload a text-based resume.",
        );
      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, resumeText }),
      });
      let data: unknown;
      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an unreadable response. Please try again.",
        );
      }
      if (!response.ok)
        throw new Error(
          typeof data === "object" && data && "error" in data
            ? String(data.error)
            : "Analysis failed. Please try again.",
        );
      const validated = analysisSchema.safeParse(data);
      if (!validated.success)
        throw new Error(
          "The analysis response was incomplete. Please try again.",
        );
      sessionStorage.setItem(
        "offerpilot-result",
        JSON.stringify(validated.data),
      );
      sessionStorage.setItem(
        "offerpilot-context",
        JSON.stringify({
          jobTitle: values.jobTitle,
          companyName: values.companyName,
        }),
      );
      router.push("/results");
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? "Could not reach the analysis service. Check your connection and try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit, () =>
        setFileError(validateResume(file ?? undefined) ?? undefined),
      )}
      noValidate
      className="glass rounded-3xl p-5 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <ResumeUpload
            file={file}
            onChange={(next) => {
              setFile(next);
              setFileError(validateResume(next ?? undefined) ?? undefined);
            }}
            error={fileError}
          />
          <div>
            <label htmlFor="jobTitle" className="label">
              Job title <span className="text-zinc-600">(optional)</span>
            </label>
            <input
              id="jobTitle"
              className="input"
              placeholder="e.g. Senior Product Designer"
              {...register("jobTitle")}
            />
          </div>
          <div>
            <label htmlFor="companyName" className="label">
              Company <span className="text-zinc-600">(optional)</span>
            </label>
            <input
              id="companyName"
              className="input"
              placeholder="e.g. Acme"
              {...register("companyName")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="jobDescription" className="label">
            Job description <span className="text-violet-300">*</span>
          </label>
          <textarea
            id="jobDescription"
            rows={13}
            className="input resize-none"
            placeholder="Paste the full job description here…"
            aria-invalid={!!errors.jobDescription}
            {...register("jobDescription")}
          />
          {errors.jobDescription && (
            <p role="alert" className="mt-2 text-xs text-rose-400">
              {errors.jobDescription.message}
            </p>
          )}
        </div>
      </div>
      {submitError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-rose-400/20 bg-rose-400/[.06] p-4 text-sm text-rose-200"
        >
          {submitError}
        </div>
      )}
      {busy && <AnalysisProgress />}
      <div className="mt-7 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-zinc-600">
          <ShieldCheck size={15} /> Your file is processed for this analysis
          only and is not stored.
        </p>
        <button
          disabled={
            busy || !file || !isValid || jobDescription.trim().length < 100
          }
          className="button-primary"
        >
          {busy ? (
            <>
              <LoaderCircle className="animate-spin" size={16} /> Analysing your
              match…
            </>
          ) : (
            <>
              Analyse match <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function AnalysisProgress() {
  const steps = [
    "Reading your resume",
    "Comparing required skills",
    "Identifying missing keywords",
    "Preparing your cover letter",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % steps.length),
      1800,
    );
    return () => window.clearInterval(timer);
  }, [steps.length]);
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-6 flex items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-400/[.06] p-4 text-sm text-violet-100"
    >
      <LoaderCircle className="animate-spin text-violet-300" size={17} />
      <span>{steps[index]}…</span>
    </div>
  );
}
