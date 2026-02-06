export default function ChangePassword ({password, setPassword,newPassword_repeat, setNewPassword_repeat ,change}){

return(
<div>
    <h1>Cambiar contraseña </h1>
    <form onSubmit={change}>
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