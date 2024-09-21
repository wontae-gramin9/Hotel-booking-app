import styled, { css } from "styled-components";

// Form이 modal에서 쓰이냐 modal없이 쓰이냐에 따라
// 외부패딩같은 css를 조건제어하기위해
// Styled component인 Form에 type prop을 주면
// 그에 따라 css를 선택
const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  tpye: "regular",
};

export default Form;
