
export default function RecoverPassword(){
  const [email, setEmail] = useState("");




return(
  <div>
    <h1>Recuperar contraseña</h1>
    <form onSubmit={infoSubmit }>
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