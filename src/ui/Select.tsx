import type { Option } from "@/types/options";
import styled from "styled-components";

type SelectProps = {
  type?: "white";
};

const StyledSelect = styled.select<SelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function Select({
  options,
  value,
  onChange,
  ...props
}: {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement> &
  SelectProps) {
  return (
    <StyledSelect onChange={onChange} value={value} {...props}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
}
