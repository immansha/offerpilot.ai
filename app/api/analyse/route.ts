import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { analyseWithGemini } from "@/lib/gemini";
import { requestSchema } from "@/lib/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  console.info("[analyse] Request received");
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "The request body must be valid JSON." },
        { status: 400 },
      );
    }
    const input = requestSchema.parse(body);
    console.info(`[analyse] Resume length: ${input.resumeText.length}`);
    console.info(`[analyse] JD length: ${input.jobDescription.length}`);
    return NextResponse.json(await analyseWithGemini(input));
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid request." },
        { status: 400 },
      );
    }
    const message = error instanceof Error ? error.message : "UNKNOWN";
    if (message === "CONFIGURATION_ERROR") {
      return NextResponse.json(
        {
          error:
            "Gemini API key is missing. Add GEMINI_API_KEY to .env.local and restart the server.",
        },
        { status: 503 },
      );
    }
    if (message.includes("429") || message.toLowerCase().includes("quota")) {
      return NextResponse.json(
        { error: "The analysis service is busy. Please try again shortly." },
        { status: 429 },
      );
    }
    if (message === "EMPTY_AI_RESPONSE" || message === "INVALID_AI_RESPONSE") {
      return NextResponse.json(
        { error: "The AI returned an invalid response. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json(
      {
        error:
          "Gemini could not complete the analysis. Please check your connection and try again.",
      },
      { status: 502 },
    );
  }
}
