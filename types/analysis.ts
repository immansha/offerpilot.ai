export interface Insight {
  skill?: string;
  area?: string;
  explanation: string;
}

export interface AnalysisResult {
  matchScore: number;
  scoreExplanation: string;
  missingKeywords: { important: string[]; optional: string[] };
  skillGapAnalysis: {
    strongMatches: Insight[];
    missingSkills: Insight[];
    areasToImprove: Insight[];
  };
  coverLetter: string;
}
