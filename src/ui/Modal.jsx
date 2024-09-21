import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useState, createContext, useContext, cloneElement } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = (openName) => setOpenName(openName);
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function Open({ children, openWindowName }) {
  const { open } = useContext(ModalContext);
  // Button이 children으로 들어올텐데, 어떻게 open event handler를 달아주지?
  // https://react.dev/reference/react/cloneElement
  return cloneElement(children, { onClick: () => open(openWindowName) });
}

export function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* cloneElement으로 오는 컴포넌트들은 모두 onCloseModal를 prop에 넣어주고,
        눌려졌을 때 close가 실행되기를 원하는 버튼에 onClick={onCloseModal}을 달아주면 된다. */}
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
      ;
    </Overlay>,
    document.body // 렌더하고 싶은 위치. body(최상단)의 1번째 child
  );
}

Modal.Open = Open;
Modal.Window = Window;
