import { CheckCircle2, CircleAlert, TrendingUp } from "lucide-react";
import type { Insight } from "@/types/analysis";

export function SkillGap({
  data,
}: {
  data: {
    strongMatches: Insight[];
    missingSkills: Insight[];
    areasToImprove: Insight[];
  };
}) {
  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-semibold">Skill gap analysis</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Group
          title="Strong matches"
          icon={<CheckCircle2 size={16} />}
          tone="text-emerald-300"
          items={data.strongMatches}
        />
        <Group
          title="Missing skills"
          icon={<CircleAlert size={16} />}
          tone="text-amber-300"
          items={data.missingSkills}
        />
        <Group
          title="Areas to improve"
          icon={<TrendingUp size={16} />}
          tone="text-violet-300"
          items={data.areasToImprove}
        />
      </div>
    </section>
  );
}
function Group({
  title,
  icon,
  tone,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  tone: string;
  items: Insight[];
}) {
  return (
    <div>
      <h3 className={`flex items-center gap-2 text-sm font-medium ${tone}`}>
        {icon}
        {title}
      </h3>
      <div className="mt-3 space-y-3">
        {items.length ? (
          items.map((item, i) => (
            <article
              key={`${item.skill ?? item.area}-${i}`}
              className="rounded-xl bg-black/20 p-4"
            >
              <p className="text-sm font-medium">{item.skill ?? item.area}</p>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">
                {item.explanation}
              </p>
            </article>
          ))
        ) : (
          <p className="text-xs text-zinc-600">No findings in this group.</p>
        )}
      </div>
    </div>
  );
}
