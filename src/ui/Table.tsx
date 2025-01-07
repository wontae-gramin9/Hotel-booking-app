import React, { useContext } from "react";
import { createContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

type CommonRowProps = {
  columns: string;
};

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType | null>(null);

export default function Table({
  columns,
  children,
}: {
  columns: string;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "row" | "column";
}) {
  const context = useContext(TableContext);
  if (context === null)
    throw new Error("TableContext was used outside of Table");
  const { columns } = context;
  return (
    <StyledHeader role={role} as="header" columns={columns}>
      {children}
    </StyledHeader>
  );
}
function Row({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "row" | "column";
}) {
  const context = useContext(TableContext);
  if (context === null)
    throw new Error("TableContext was used outside of Table");
  const { columns } = context;
  return (
    <StyledRow role={role} columns={columns}>
      {children}
    </StyledRow>
  );
}

// [TsMigration] data 타입이 그대로 render method의 args로 들어가기 때문에 Generic 사용해보자
type BodyProps<T> = {
  data: T[];
  render: (item: T) => React.ReactNode;
};

// 컴포넌트에도 <T>를 추가하는 이유:
// 제너릭 타입 <T>를 컴포넌트의 범위에서 사용할 수 있기 위함이다
// <T>가 없으면, 해당 컴포넌트는 BodyProps<T>의 T가 어디서 왔는지 모른다
// 컴포넌트가 <T>를 받아야 한다.
function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
// Footer에는 어떤 로직도 필요하지 않기때문에 따로 child컴포넌트를 만들지 않고 styled component를 바로 사용
Table.Footer = Footer;
