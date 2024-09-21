import { useRef, useEffect } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  // DOM Ref를 쓰면, ref.current값은 진짜 html tag값이 된다.

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
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
}
