import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CoverLetter } from "@/components/cover-letter";

describe("CoverLetter", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    URL.createObjectURL = vi.fn(() => "blob:cover-letter");
    URL.revokeObjectURL = vi.fn();
  });

  it("copies the generated letter", async () => {
    render(<CoverLetter letter="A tailored cover letter." />);
    await userEvent.click(screen.getByRole("button", { name: /copy/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "A tailored cover letter.",
    );
    expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
  });

  it("downloads the letter as Markdown", async () => {
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined);
    render(<CoverLetter letter="A tailored cover letter." />);

    await userEvent.click(screen.getByRole("button", { name: /markdown/i }));

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:cover-letter");
  });
});
