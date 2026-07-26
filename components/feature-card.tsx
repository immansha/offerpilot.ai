import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="glass rounded-2xl p-6">
      <span className="mb-5 grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
        <Icon size={18} />
      </span>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{children}</p>
    </article>
  );
}
