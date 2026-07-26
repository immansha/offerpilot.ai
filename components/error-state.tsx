import Link from "next/link";
import { CircleAlert } from "lucide-react";
export function ErrorState({
  message = "We couldn’t load this analysis.",
}: {
  message?: string;
}) {
  return (
    <div className="container-page grid min-h-screen place-items-center py-20">
      <div className="glass max-w-md rounded-2xl p-8 text-center">
        <CircleAlert className="mx-auto text-rose-300" />
        <h1 className="mt-4 text-xl font-semibold">Analysis unavailable</h1>
        <p className="mt-2 text-sm text-zinc-500">{message}</p>
        <Link href="/analyse" className="button-primary mt-6">
          Start a new analysis
        </Link>
      </div>
    </div>
  );
}
