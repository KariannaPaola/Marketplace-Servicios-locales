import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verificando...");

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await verifyEmail(token);
        setMessage(data.msg);
      } catch (err) {
        setMessage(
          err.response?.data?.msg || "Error al verificar el correo"
        );
      } 
    };
    verify();
  }, []);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}