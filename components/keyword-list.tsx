import { Tag } from "lucide-react";

export function KeywordList({
  important,
  optional,
}: {
  important: string[];
  optional: string[];
}) {
  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <Tag className="text-violet-300" size={17} />
        <h2 className="font-semibold">Missing keywords</h2>
      </div>
      <KeywordGroup
        label="Important"
        items={important}
        tone="border-amber-400/20 bg-amber-400/[.07] text-amber-200"
      />
      <KeywordGroup
        label="Optional"
        items={optional}
        tone="border-white/10 bg-white/[.04] text-zinc-300"
      />
    </section>
  );
}
function KeywordGroup({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: string;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-xs uppercase tracking-wider text-zinc-600">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.length ? (
          items.map((x) => (
            <span
              key={x}
              className={`rounded-full border px-3 py-1.5 text-xs ${tone}`}
            >
              {x}
            </span>
          ))
        ) : (
          <span className="text-sm text-zinc-600">None identified</span>
        )}
      </div>
    </div>
  );
}
