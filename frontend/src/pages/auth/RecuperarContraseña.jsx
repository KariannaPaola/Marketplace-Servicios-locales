import { useState } from "react";
import { recoverPassword } from "../../services/auth";

export default function RecoverPassword(){
  const [email, setEmail] = useState("");

  const handleRecoverPassword = async (e)=>{
    e.preventDefault();
    try {
      await recoverPassword(email)
    } catch (error) {
        console.log ("Error al enviar enlace de recuperacion")
    }
  }


return(
  <div>
    <h1>Recuperar contraseña</h1>
    <form onSubmit={handleRecoverPassword}>
      <input
          type="text"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <button type="submit">Enviar enlace</button>
    </form>
  </div>
)

}