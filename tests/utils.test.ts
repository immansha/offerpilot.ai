import { describe, expect, it } from "vitest";
import { cleanJson } from "@/lib/utils";

describe("cleanJson", () => {
  it("removes markdown JSON code fences", () => {
    expect(cleanJson('```json\n{"matchScore": 80}\n```')).toBe(
      '{"matchScore": 80}',
    );
  });
});
