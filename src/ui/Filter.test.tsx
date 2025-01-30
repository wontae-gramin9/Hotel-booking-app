import { render, screen } from "@/tests/test-utils";
import Filter from "./Filter";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Filter", () => {
  it("shows DashboardFilter", () => {
    render(
      <Filter
        filterField="last"
        options={[
          { value: "7", label: "Last 7 days" },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 90 days" },
        ]}
      />
    );
    const filter = screen.getByText(/Last 7 days/i);
    expect(filter).toBeInTheDocument();
  });
});
