import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "@/features/authentication/useLogout";
import ButtonIcon from "@/ui/ButtonIcon";
import SpinnerMini from "@/ui/SpinnerMini";

export default function Logout() {
  const { isLoading, logout } = useLogout();
  return (
    // [TsMigration] logout의 타입이 UseMutateFunction<void, unknown, void, unknown이라 지랄맞기때문에
    <ButtonIcon disabled={isLoading} onClick={() => logout}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
