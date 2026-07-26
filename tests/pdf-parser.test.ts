import { describe, expect, it, vi } from "vitest";

vi.mock("pdfjs-dist", () => ({
  GlobalWorkerOptions: { workerSrc: "" },
  getDocument: () => ({
    promise: Promise.resolve({
      numPages: 2,
      getPage: async (page: number) => ({
        getTextContent: async () => ({
          items:
            page === 1
              ? [{ str: "Senior   Engineer" }, { str: "TypeScript" }]
              : [{ str: "React" }, { str: "Testing" }],
        }),
      }),
    }),
  }),
}));

import { extractPdfText } from "@/lib/pdf-parser";

describe("extractPdfText", () => {
  it("extracts and normalises text from every PDF page", async () => {
    const file = {
      arrayBuffer: async () => new ArrayBuffer(8),
    } as File;

    await expect(extractPdfText(file)).resolves.toBe(
      "Senior Engineer TypeScript React Testing",
    );
  });
});
