"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="container-page grid min-h-[calc(100vh-80px)] items-center gap-16 py-20 lg:grid-cols-[1.08fr_.92fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
          <Sparkles size={13} /> Your application, made more intentional
        </div>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-6xl lg:text-7xl">
          Turn every job description into an{" "}
          <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
            interview strategy.
          </span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
          Upload your resume and get a focused AI analysis of your match,
          missing keywords, skill gaps, and a tailored cover letter.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.025 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link href="/analyse" className="button-primary">
              Analyse my resume <ArrowRight size={16} />
            </Link>
          </motion.div>
          <span className="text-xs text-zinc-500">
            PDF only · 5 MB max · No account needed
          </span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -5, 0] }}
        transition={{
          opacity: { delay: 0.15, duration: 0.55 },
          scale: { delay: 0.15, duration: 0.55 },
          y: { delay: 0.8, duration: 5, repeat: Infinity },
        }}
        className="relative"
      >
        <div className="absolute inset-8 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="glass relative rounded-3xl p-5 shadow-glow">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-white/5">
                <FileText size={17} />
              </span>
              <div>
                <p className="text-sm font-medium">Product Designer</p>
                <p className="text-xs text-zinc-500">Match analysis</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
              Complete
            </span>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-5">
            <div className="grid aspect-square place-items-center rounded-full border-[9px] border-violet-500/20 border-t-violet-400 text-center">
              <div>
                <strong className="text-3xl">84</strong>
                <p className="text-[10px] text-zinc-500">MATCH</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                "Strong product thinking",
                "Add experimentation metrics",
                "Highlight Figma systems work",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-white/[.035] p-3 text-xs text-zinc-300"
                >
                  <Check className="text-violet-300" size={14} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            {["User research", "Design systems", "Prototyping"].map((x) => (
              <span
                key={x}
                className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-zinc-400"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
