import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

// MODAL의 state(isOpenModal)는 MODAL만 알고 있게 encapsulate함
// Compound component를 쓰면 Modal내부에 렌더될 컴포넌트와, 모달을 open/close를 할 방법을
// Modal의 context 내부로 옮길 수 있음
export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open openWindowName="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        {/* Modal.Window에서 children을 cloneElement해서 prop을 주었으니
        Modal을 직접 쓸 때는 onCloseModal을 몰라도 된다.  */}
        <CreateCabinForm />
      </Modal.Window>

      {/* 모달이 보여줄 수 있는 여러 Window가 있고, 그중 하나를 선택해서 보여준다는 기획 
      opens, name이 key가 되는 것*/}
      {/* <Modal.Open openWindowName="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}
