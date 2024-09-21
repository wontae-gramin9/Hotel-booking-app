import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // supabase.signOut()은 로컬스토리지와 jwt를 만료시키겠지만
      // React Query가 매뉴얼하게 set한 setQueriesData는 바꾸지 않는다.
      queryClient.removeQueries();
      navigate("/dashboard", { replace: true });
    },
  });
  return { isLoading, logout };
}
