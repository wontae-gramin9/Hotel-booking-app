import { render, screen } from "@/tests/test-utils";
import Dashboard from "./Dashboard";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Dashboard", () => {
  it('shows the header, "Dashboard"', () => {
    render(<Dashboard />);
    const header = screen.getByText(/Dashboard/i); // screen(=DOM).queryDom()
    expect(header).toBeInTheDocument();
  });
});
