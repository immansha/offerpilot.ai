"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";

export function CoverLetter({ letter }: { letter: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([letter], { type: "text/markdown" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailored-cover-letter.md";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Tailored cover letter</h2>
          <p className="mt-1 text-xs text-zinc-600">
            Review and personalise before sending.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={copy} className="button-secondary" type="button">
            {copied ? (
              <Check className="animate-pulse text-emerald-300" size={15} />
            ) : (
              <Copy size={15} />
            )}{" "}
            {copied ? "Copied" : "Copy"}
          </button>
          <button onClick={download} className="button-secondary" type="button">
            <Download size={15} /> Markdown
          </button>
        </div>
      </div>
      <div className="whitespace-pre-wrap break-words px-1 py-7 text-sm leading-7 text-zinc-300">
        {letter}
      </div>
    </section>
  );
}
