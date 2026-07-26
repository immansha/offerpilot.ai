"use client";

import { useEffect, useState } from "react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export function MatchScore({
  score,
  explanation,
}: {
  score: number;
  explanation: string;
}) {
  const [visibleScore, setVisibleScore] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleScore(score);
      return;
    }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / 700, 1);
      setVisibleScore(Math.round(score * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);
  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <div className="relative h-36 w-36 shrink-0">
          <ResponsiveContainer>
            <RadialBarChart
              innerRadius="78%"
              outerRadius="100%"
              data={[{ value: visibleScore, fill: "#a78bfa" }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: "rgba(255,255,255,.07)" }}
                cornerRadius={10}
                isAnimationActive={false}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <strong className="text-3xl">{visibleScore}</strong>
              <span className="text-zinc-600">/100</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-violet-300">
            AI-generated Job Match Score
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            {score >= 75
              ? "Strong alignment"
              : score >= 50
                ? "Promising foundation"
                : "Room to strengthen"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{explanation}</p>
          <p className="mt-3 text-[11px] text-zinc-600">
            Guidance only—not a real ATS score or hiring prediction.
          </p>
        </div>
      </div>
    </section>
  );
}
