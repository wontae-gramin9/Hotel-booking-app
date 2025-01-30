import { render, screen } from "@/tests/test-utils";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Stat from "./Stat";

import { HiOutlineBriefcase } from "react-icons/hi2";

describe("Stat", () => {
  it("shows Stat", () => {
    render(
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={3}
      />
    );
    const numBookings = screen.getByText("3");
    expect(numBookings).toBeInTheDocument();
  });
});
