import {
  GoogleGenerativeAI,
  SchemaType,
  type Schema,
} from "@google/generative-ai";
import { analysisSchema, type AnalysisRequest } from "@/lib/schemas";
import { cleanJson } from "@/lib/utils";

const responseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    matchScore: { type: SchemaType.INTEGER },
    scoreExplanation: { type: SchemaType.STRING },
    missingKeywords: {
      type: SchemaType.OBJECT,
      properties: {
        important: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
        optional: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
      },
      required: ["important", "optional"],
    },
    skillGapAnalysis: {
      type: SchemaType.OBJECT,
      properties: {
        strongMatches: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              skill: { type: SchemaType.STRING },
              explanation: { type: SchemaType.STRING },
            },
            required: ["skill", "explanation"],
          },
        },
        missingSkills: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              skill: { type: SchemaType.STRING },
              explanation: { type: SchemaType.STRING },
            },
            required: ["skill", "explanation"],
          },
        },
        areasToImprove: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              area: { type: SchemaType.STRING },
              explanation: { type: SchemaType.STRING },
            },
            required: ["area", "explanation"],
          },
        },
      },
      required: ["strongMatches", "missingSkills", "areasToImprove"],
    },
    coverLetter: { type: SchemaType.STRING },
  },
  required: [
    "matchScore",
    "scoreExplanation",
    "missingKeywords",
    "skillGapAnalysis",
    "coverLetter",
  ],
};

export const GEMINI_MODEL = "gemini-2.5-flash";

export async function analyseWithGemini(input: AnalysisRequest) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("CONFIGURATION_ERROR");

  const model = new GoogleGenerativeAI(key).getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: { responseMimeType: "application/json", responseSchema },
  });
  const prompt = `You are an expert career coach. Compare the resume to the job description.
The score is an AI-generated Job Match Score, not an ATS score. Be evidence-based and do not invent experience.
Write a polished, truthful cover letter without placeholders. Return only JSON matching the schema.

JOB TITLE: ${input.jobTitle || "Not provided"}
COMPANY: ${input.companyName || "Not provided"}

RESUME:
${input.resumeText.slice(0, 50000)}

JOB DESCRIPTION:
${input.jobDescription.slice(0, 30000)}`;

  console.info("[analyse] Gemini started");
  let text: string;
  try {
    const result = await model.generateContent(prompt);
    text = result.response.text();
    console.info("[analyse] Gemini finished");
  } catch (error) {
    const providerMessage =
      error instanceof Error
        ? error.message.replaceAll(key, "[redacted]")
        : "Unknown Gemini error";
    console.error(`[analyse] Gemini failed: ${providerMessage}`);
    throw error;
  }
  if (!text.trim()) throw new Error("EMPTY_AI_RESPONSE");
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanJson(text));
  } catch {
    console.error("[analyse] Gemini returned malformed JSON");
    throw new Error("INVALID_AI_RESPONSE");
  }
  const validated = analysisSchema.safeParse(parsed);
  if (!validated.success) {
    const fields = validated.error.issues
      .map((issue) => issue.path.join("."))
      .join(", ");
    console.error(`[analyse] Gemini response failed validation: ${fields}`);
    throw new Error("INVALID_AI_RESPONSE");
  }
  return validated.data;
}
