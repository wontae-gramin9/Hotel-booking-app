import { useRef, useEffect } from "react";

export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref = useRef<HTMLElement | null>(null);
  // DOM Ref를 쓰면, ref.current값은 진짜 html tag값이 된다.

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // [TS Migration] React.MouseEvent는 JSX에서만 사용됨, document에 달 거면 MouseEvent가 맞다
        // e.target의 타입은 EventTarget인데, Dom요소보다 더 넓은 타입이므로 Node로 타입 단언을 해줘야 한다.

        // html tag에 contains(): StyledModal이 클릭된 타겟을 contains하는가? → 자식으로 가지고 있는가?
        // Array에서 값이 있는가는 includes(), 헷갈림
        handler();
      }
    }

    // 왜 Add new cabin 버튼을 눌러도 모달이 보이지 않을까?
    // createPortal로 modal을 body의 바로 밑에 놓았지?
    // 리액트에서는 렌더링된 element에 event listener가 들어간다.
    // 버튼을 누르면, 그 이벤트가 bubble up하면 최상단에 렌더된 element에서 들으므로
    // 애초에 ref의 outside에서 클릭이 된게 되어버려 열자마자 바로 닫히는 것
    // 캡처링 단계에서 바로 잡으면, 바깥에 있는 Modal까지 올라가지 않아 외부 클릭이 된 것으로 인식하지 않는다.
    document.addEventListener("click", handleClick, listenCapturing);
    return () => {
      // 이 작용은 Modal.Window이 켜져있을때만 일어나야하므로 unmount되면 같이 없애줘야 한다
      // 그러므로 handleClick를 useEffect내부에 선언
      document.removeEventListener("click", handleClick);
    };
  }, [handler, listenCapturing]);

  return ref;
  // [TsMigration]
  // React의 ref는 LegacyRef<T> 또는 MutableRefObject<T>로 기대되며, 여기서 T는 구체적인 타입이어야 합니다.
  // HTMLElement는 HTMLDivElement나 HTMLUListElement의 상위 타입이므로, React는 이를 더 구체적인 타입으로 안전하게 캐스팅할 수 없다고 판단합니다.
  // 이는 타입 안정성을 강화하기 위한 TypeScript의 설계입니다.
}
