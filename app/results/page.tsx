import { Suspense } from "react";
import { LoadingAnalysis } from "@/components/loading-analysis";
import { ResultsClient } from "@/components/results-client";
export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingAnalysis />}>
      <ResultsClient />
    </Suspense>
  );
}
