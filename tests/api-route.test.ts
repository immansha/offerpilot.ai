// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/analyse/route";

const originalKey = process.env.GEMINI_API_KEY;

afterEach(() => {
  if (originalKey === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = originalKey;
  vi.restoreAllMocks();
});

describe("POST /api/analyse", () => {
  it("returns an actionable server-only error when the Gemini key is missing", async () => {
    delete process.env.GEMINI_API_KEY;
    vi.spyOn(console, "info").mockImplementation(() => undefined);

    const response = await POST(
      new Request("http://localhost/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText:
            "Experienced software engineer building reliable TypeScript and React applications with measurable product outcomes.",
          jobDescription:
            "We are seeking a software engineer with strong TypeScript, React, testing, collaboration, deployment, and product development experience.",
        }),
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error:
        "Gemini API key is missing. Add GEMINI_API_KEY to .env.local and restart the server.",
    });
  });

  it("rejects malformed JSON", async () => {
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    const response = await POST(
      new Request("http://localhost/api/analyse", {
        method: "POST",
        body: "{",
      }),
    );
    expect(response.status).toBe(400);
  });
});
