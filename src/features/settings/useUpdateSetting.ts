// cabin feature에서만 쓰이는 hook이므로 hooks에 들어가지 않음
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi, // data => createEditCabin(data)
    onSuccess: () => {
      toast.success("Cabin successfully uploaded");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}
