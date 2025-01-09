import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import type { Option } from "@/types/options";

export default function SortBy({ options }: { options: Option[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("discount") || "";
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      type="white"
    />
  );
}
