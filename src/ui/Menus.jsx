import { useContext, createContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const open = (id) => setOpenId(id);
  const close = () => setOpenId("");
  const [position, setPosition] = useState();

  return (
    <MenusContext.Provider
      value={{
        openId,
        open,
        close,
        position,
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 10,
    });
    (openId === "") | (openId !== id) ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// 이 메뉴 리스트도 overlay가 되니 createPortal로 css를 conflict를 막는다
function List({ id, children }) {
  const { openId, close, position } = useContext(MenusContext);
  // 이벤트캡처링 → 이벤트버블링으로 변경하고, Toggle에서 e.stopPropagation으로 버블링을 막는다.
  // context provider는 항상 리렌더링이 되나, 캡처링으로 하면
  // 1. outsideClick의 close()가 openId를 먼저 ""으로 만들고
  // 2. toggle()이 실행되어 openId === '' → open(id)가 실행되어
  // 닫히지 않는다.
  // 따라서 버블링으로 실행되어야 2번 이전에 1번이 먼저 실행되는걸 막을 수 있고
  // 이후에 1번이 실행되는 걸 막기 위해서 e.stopPropagation()을 실행한다.
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}
// ul내부에 있을거니 li가 semantic적으로 맞음
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        <span>
          {icon} {children}
        </span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
