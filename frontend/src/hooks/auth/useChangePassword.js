import { changePassword } from "../../services/auth"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useChangePassword(){
  const {token}=useParams()
  const [password, setPassword] = useState("");
  const [newPassword_repeat, setNewPassword_repeat] = useState("");
  const navigate= useNavigate()

const change= async(e)=>{
  e.preventDefault()
  try {
    await changePassword(token, password, newPassword_repeat)
    navigate("/contraseñaCambiada");
  } catch (error) {
    console.log("Error al cambiar contraseña")
  }
}


  return{ password, setPassword,newPassword_repeat, setNewPassword_repeat ,change}
}