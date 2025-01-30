import { render, screen } from "@/tests/test-utils";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import DashboardLayout from "./DashboardLayout";
import * as React from "react";

describe("DashboardLayout", () => {
  it("shows DashboardLayout", () => {
    render(<DashboardLayout />);
    // 렌더할때 나오는구나.
    // const filter = screen.getByText(/Last 7 days/i);
    // expect(filter).toBeInTheDocument();
  });
});
