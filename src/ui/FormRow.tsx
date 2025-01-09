import React, { isValidElement } from "react";
import { styled } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function FormRow({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  let htmlFor = "";

  // children이 props를 가지고 있는 input일 때
  if (isValidElement(children) && "type" in children.props) {
    htmlFor = children.props.type; // 안전하게 type에 접근
  }
  // input type이 아닌 button, div가 들어올 때

  return (
    <StyledFormRow>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
