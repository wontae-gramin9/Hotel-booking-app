// cabin feature에서만 쓰이는 hook이므로 hooks에 들어가지 않음
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "@/services/apiCabins";
import { Cabin } from "@/types/cabin";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (data: Partial<Cabin>) => createEditCabin(data, undefined),
    onSuccess: () => {
      toast.success("Cabin successfully uploaded");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}
