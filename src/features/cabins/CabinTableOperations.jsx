import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      ></Filter>
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (high first)" },
          { value: "regularPrice-desc", label: "Sort by price (low first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (high first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (low first)" },
        ]}
      ></SortBy>
    </TableOperations>
  );
}
