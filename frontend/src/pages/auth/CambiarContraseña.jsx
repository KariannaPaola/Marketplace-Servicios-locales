import { changePassword } from "../../services/auth"
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ChangePassword(){
  const {token}=useParams()
  const [password, setPassword] = useState("");
  const [newPassword_repeat, setNewPassword_repeat] = useState("");

const handleChangePassword= async(e)=>{
  e.preventDefault()
  try {
    await changePassword(token, password, newPassword_repeat)
    console.log("Contraseña cambiada con exito")
  } catch (error) {
    console.log("Error al cambiar contraseña")
  }
}


return(
  <div>
    <h1>Cambiar contraseña </h1>
    <form onSubmit={handleChangePassword}>
      <input type="text" 
        placeholder="Ingresa la nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input type="text" 
        placeholder="Ingresa otra vez la contraseña"
        value={newPassword_repeat}
        onChange={(e) => setNewPassword_repeat(e.target.value)}
        required
      />
  <button type="submit">Cambiar contraseña</button>
    </form>
  </div>
)

}