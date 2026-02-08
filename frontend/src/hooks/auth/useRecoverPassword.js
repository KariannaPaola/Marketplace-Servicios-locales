import { useState } from "react";
import { recoverPassword } from "../../services/auth";

export default function useRecoverPassword(){
const [email, setEmail] = useState("");
const [error, setError] = useState([]);
const [message, setMessage] = useState("");

  const handleRecoverPassword = async()=>{
    const errors=[]
    if (!email) {
    errors.push("Todos los campos son obligatorios");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      errors.push("Ingrese un correo válido");
    }
    if (errors.length > 0) {
      setError(errors);
      return;
      }
    try {
      const data= await recoverPassword(email)
      console.log("Contraseña cambiada con exito")
      setMessage(data.message)
      navigate("/contraseñaCambiada");
    } catch (error) {
      setError([error.response?.data?.message  || "Error al recuperar contraseña"]);
    }
  }

return{email,setEmail,handleRecoverPassword,setError,error, message}
}