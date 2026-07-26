import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect } from "vitest";
import { JobForm } from "@/components/job-form";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("JobForm", () => {
  it("disables submission while required inputs are missing", async () => {
    render(<JobForm />);
    expect(
      screen.getByRole("button", { name: /analyse match/i }),
    ).toBeDisabled();
    await userEvent.type(
      screen.getByLabelText(/job description/i),
      "Too short",
    );
    expect(
      await screen.findByText(/add at least 100 characters/i),
    ).toBeInTheDocument();
  });
});
