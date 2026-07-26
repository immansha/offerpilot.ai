import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResultsClient } from "@/components/results-client";

vi.mock("next/navigation", () => ({}));

describe("ResultsClient", () => {
  it("shows a useful empty state when no result is stored", async () => {
    sessionStorage.clear();
    render(<ResultsClient />);
    expect(
      await screen.findByRole("heading", { name: /analysis unavailable/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /start a new analysis/i }),
    ).toHaveAttribute("href", "/analyse");
  });
});
