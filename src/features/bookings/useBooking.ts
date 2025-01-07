import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(parseInt(bookingId!)),
    retry: false, // 여러번 봤는데, 처음에 실패하면 3번정도 다시 불러오려고 하더라고.
  });

  return { isLoading, booking };
}
