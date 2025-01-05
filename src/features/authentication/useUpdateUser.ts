import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "@/services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    // mutationFn은 arg를 하나만 허용한다. 그러므로 여러 값을 넣으려면
    // obj 하나에 destructuring으로
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueriesData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
