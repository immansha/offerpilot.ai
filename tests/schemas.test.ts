import { describe, expect, it } from "vitest";
import { analysisSchema } from "@/lib/schemas";

const valid = {
  matchScore: 78,
  scoreExplanation:
    "The resume aligns well but lacks cloud deployment evidence.",
  missingKeywords: { important: ["AWS"], optional: ["Terraform"] },
  skillGapAnalysis: {
    strongMatches: [
      {
        skill: "TypeScript",
        explanation: "Demonstrated across several projects.",
      },
    ],
    missingSkills: [
      {
        skill: "AWS",
        explanation: "Required by the role but absent from the resume.",
      },
    ],
    areasToImprove: [
      {
        area: "Outcomes",
        explanation: "Add measurable impact to recent experience.",
      },
    ],
  },
  coverLetter:
    "Dear Hiring Manager,\n\nI am excited to apply for this opportunity because my experience aligns with the role. I would welcome the chance to discuss how I can contribute to your team.\n\nSincerely,\nCandidate",
};

describe("analysisSchema", () => {
  it("accepts a valid Gemini response", () =>
    expect(analysisSchema.parse(valid)).toEqual(valid));
  it.each([-1, 101, 50.5])("rejects an invalid score: %s", (matchScore) =>
    expect(() => analysisSchema.parse({ ...valid, matchScore })).toThrow(),
  );
  it.each([0, 100])("accepts boundary score: %s", (matchScore) =>
    expect(analysisSchema.parse({ ...valid, matchScore }).matchScore).toBe(
      matchScore,
    ),
  );
});
