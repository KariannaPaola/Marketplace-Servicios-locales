import useChangePassword from "../../hooks/auth/useChangePassword";
import SuccessfulChangePassword from "../../components/auth/SuccessfulChangePassword";

export default function SuccessfulChangePasswordPage() {
  const {message}=useChangePassword()


  return (
    <SuccessfulChangePassword
      message={message}
    />
  );
}