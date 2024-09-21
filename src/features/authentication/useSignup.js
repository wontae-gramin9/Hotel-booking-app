import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      navigate("/login", { replace: true });
      toast.success(
        "Account successfully created. Please verify the new account from the user's email address"
      );
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { isLoading, signup };
}
