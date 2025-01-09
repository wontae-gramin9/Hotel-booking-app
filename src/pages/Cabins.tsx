import CabinTable from "../features/cabins/CabinTable";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  // Pages 컴포넌트는 어떤 state도 없이 깔끔하길 원하기에
  // 열고닫는거 CabinRow의 Menus와 Modal로 정리함
  // const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
