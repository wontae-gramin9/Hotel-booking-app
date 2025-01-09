import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import Modal from "../../ui/Modal";
import Empty from "@/ui/Empty";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Tag from "@/ui/Tag";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "@/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "@/hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #${bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open openWindowName="deleteBooking">
          <Button icon={<HiArrowUpOnSquare />}>Delete booking</Button>
        </Modal.Open>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOut}
            onClick={() => checkout(bookingId)}
          >
            Check out
          </Button>
        )}
      </ButtonGroup>

      <Modal.Window name="deleteBooking">
        <ConfirmDelete
          disabled={isDeleting}
          resourceName="booking"
          onConfirm={() =>
            deleteBooking(bookingId, {
              onSetteled: () => navigate(-1),
            })
          }
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
