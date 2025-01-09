// cabin feature에서만 쓰이는 hook이므로 hooks에 들어가지 않음
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
