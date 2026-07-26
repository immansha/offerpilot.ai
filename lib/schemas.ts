import { z } from "zod";

const skillInsight = z.object({
  skill: z.string().trim().min(1).max(100),
  explanation: z.string().trim().min(1).max(2000),
});

const improvementInsight = z.object({
  area: z.string().trim().min(1).max(100),
  explanation: z.string().trim().min(1).max(2000),
});

export const analysisSchema = z.object({
  matchScore: z.number().int().min(0).max(100),
  scoreExplanation: z.string().trim().min(1).max(2000),
  missingKeywords: z.object({
    important: z.array(z.string().trim().min(1).max(100)).max(20),
    optional: z.array(z.string().trim().min(1).max(100)).max(20),
  }),
  skillGapAnalysis: z.object({
    strongMatches: z.array(skillInsight).max(15),
    missingSkills: z.array(skillInsight).max(15),
    areasToImprove: z.array(improvementInsight).max(15),
  }),
  coverLetter: z.string().trim().min(100).max(10000),
});

export const requestSchema = z.object({
  resumeText: z
    .string()
    .trim()
    .min(50, "Could not find enough text in this PDF.")
    .max(50000),
  jobDescription: z
    .string()
    .trim()
    .min(100, "Job description must be at least 100 characters.")
    .max(30000),
  jobTitle: z.string().trim().max(150).optional(),
  companyName: z.string().trim().max(150).optional(),
});

export const formSchema = z.object({
  jobDescription: z
    .string()
    .trim()
    .min(100, "Add at least 100 characters from the job description."),
  jobTitle: z.string().max(150).optional(),
  companyName: z.string().max(150).optional(),
});

export type AnalysisResponse = z.infer<typeof analysisSchema>;
export type AnalysisRequest = z.infer<typeof requestSchema>;
