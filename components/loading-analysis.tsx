export function LoadingAnalysis() {
  return (
    <div
      aria-label="Loading analysis"
      className="container-page animate-pulse py-24"
    >
      <div className="mb-8 h-8 w-64 rounded bg-white/10" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="h-52 rounded-2xl bg-white/5" />
        <div className="h-52 rounded-2xl bg-white/5" />
      </div>
      <div className="mt-5 h-72 rounded-2xl bg-white/5" />
    </div>
  );
}
