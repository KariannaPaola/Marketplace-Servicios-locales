import SuccessfulPayMyfee from "../../components/providers/SuccessfulPayMyFee";
import usePayFeeProvider from "../../hooks/providers/usePayMyFeeProvider";

export default function SuccessfulPayMyFeePage() {
  const {message}=usePayFeeProvider()

  return (
    <SuccessfulPayMyfee
      message={message}
    />
  );
}