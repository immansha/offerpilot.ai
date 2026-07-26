"use client";

import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

const MAX_SIZE = 5 * 1024 * 1024;

export function validateResume(file?: File) {
  if (!file) return "Upload your resume PDF.";
  if (
    file.type !== "application/pdf" &&
    !file.name.toLowerCase().endsWith(".pdf")
  )
    return "Only PDF files are accepted.";
  if (file.size > MAX_SIZE) return "Your PDF must be 5 MB or smaller.";
  return null;
}

export function ResumeUpload({
  file,
  onChange,
  error,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const choose = (next?: File) => onChange(next ?? null);
  return (
    <div>
      <label className="label">
        Resume PDF <span className="text-violet-300">*</span>
      </label>
      {file ? (
        <div className="flex items-center justify-between rounded-xl border border-violet-400/30 bg-violet-400/[.06] p-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="shrink-0 text-violet-300" size={20} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-zinc-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              choose();
              if (input.current) input.current.value = "";
            }}
            aria-label="Remove resume"
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            choose(e.dataTransfer.files[0]);
          }}
          className={`w-full rounded-xl border border-dashed p-8 text-center transition ${dragging ? "border-violet-400 bg-violet-400/10" : "border-white/15 bg-black/10 hover:border-white/30"}`}
        >
          <UploadCloud className="mx-auto text-zinc-400" size={25} />
          <span className="mt-3 block text-sm font-medium">
            Drop your PDF or browse
          </span>
          <span className="mt-1 block text-xs text-zinc-600">
            Text-based PDF, maximum 5 MB
          </span>
        </button>
      )}
      <input
        ref={input}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={(e) => choose(e.target.files?.[0])}
      />
      {error && (
        <p role="alert" className="mt-2 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
