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

type Position = {
  x: number;
  y: number;
};

type ListProps = {
  position: Position;
};

const StyledList = styled.ul<ListProps>`
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
type MenusContextType = {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
};

const MenusContext = createContext<MenusContextType | null>(null);

export default function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState("");
  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId("");
  const [position, setPosition] = useState<Position | null>(null);

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

function Toggle({ id }: { id: string }) {
  const context = useContext(MenusContext);
  if (context === null)
    throw new Error("MenusContext was used outside of Menus");
  const { openId, open, close, setPosition } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    // [TsMigration] Property 'closest' does not exist on type 'EventTarget' 에러는
    // TS가 e.target의 타입을 기본적으로 EventTarget으로 간주하기 때문에 발생합니다. EventTarget은 DOM 이벤트의 가장 일반적인 타입으로, closest 메서드가 포함되어 있지 않습니다.
    // 이 문제를 해결하려면 타입 단언(type assertion) 또는 타입 가드를 사용해 e.target을 적절한 타입 (HTMLElement 또는 더 구체적으로 HTMLButtonElement)으로 변환한다

    const button = (e.target as HTMLElement).closest("button")!;
    const rect = button.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 10,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// 이 메뉴 리스트도 overlay가 되니 createPortal로 css를 conflict를 막는다
function List({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(MenusContext);
  if (context === null)
    throw new Error("MenusContext was used outside of Menus");
  const { openId, close, position } = context;
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
    <StyledList
      ref={ref as React.RefObject<HTMLUListElement>}
      position={position!}
    >
      {children}
    </StyledList>,
    document.body
  );
}
// ul내부에 있을거니 li가 semantic적으로 맞음
function Button({
  children,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  // [TsMigration] disable같은 button의 IntrinsicAttributes를 사용하기 위함
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = useContext(MenusContext);
  if (context === null)
    throw new Error("MenusContext was used outside of Menus");
  const { close } = context;
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
