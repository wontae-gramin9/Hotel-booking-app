import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";
import type { Option } from "@/types/options";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

type FilterButtonProps = {
  $active: boolean;
};

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: Option[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)!.value;
  function handleClick(value: string) {
    searchParams.set(filterField, value);
    // 실제로 url querystring에 들어가려면 setSearchParams(searchParams)해줘야 함
    // 필터가 중복으로 먹혀있을때 필터를 바꾸면, page가 1로 변경이 안 되는 문제 해결
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      {options.map(({ value, label }) => (
        <FilterButton
          key={value}
          onClick={() => handleClick(value)}
          $active={currentFilter === value}
          disabled={currentFilter === value}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
