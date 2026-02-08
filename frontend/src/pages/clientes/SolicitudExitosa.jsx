import SuccessfulRequest from "../../components/Clients/SuccessfulRequest";
import useFormRequestClient from "../../hooks/clients/useFormRequestClient";

export default function SuccessfulRequestPage() {
  const {message}=useFormRequestClient()

  return (
    <SuccessfulRequest
      message={message}
    />
  );
}