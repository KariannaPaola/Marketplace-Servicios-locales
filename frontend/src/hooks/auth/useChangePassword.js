import { changePassword } from "../../services/auth"
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function useChangePassword(){
  const {token}=useParams()
  const [password, setPassword] = useState("");
  const [newPassword_repeat, setNewPassword_repeat] = useState("");

const change= async(e)=>{
  e.preventDefault()
  try {
    await changePassword(token, password, newPassword_repeat)
    console.log("Contraseña cambiada con exito")
  } catch (error) {
    console.log("Error al cambiar contraseña")
  }
}

  return{ password, setPassword,newPassword_repeat, setNewPassword_repeat ,change}
}