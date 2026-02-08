import useVerifyEmail from "../../hooks/auth/useVerifyEmail";
import VerifyEmail from "../../components/auth/VerifyEmail";

export default function VerifyEmailPage() {
  const {message}=useVerifyEmail()

  return (
    <VerifyEmail
      message={message}
    />
  );
}