import { Link } from "react-router-dom"

export default function RecoverPassword ({email,setEmail,handleRecoverPassword, error, setError, message}){
const onSubmit = async (e) => {
    e.preventDefault();
    setError([])
    await handleRecoverPassword();
  };
return(
 <section className="min-h-screen flex flex-col items-center justify-center px-4">
  <div className="bg-white flex flex-col rounded-xl shadow-lg w-full max-w-md border border-gray-200 p-6 sm:p-8 md:p-10">
    <div className="flex flex-col">
      <h2 className="text-base sm:text-lg font-bold mb-2 text-center text-gray-800">
        Recuperar contraseña
      </h2>
      <h6 className="text-gray-600 text-center mb-6 text-xs sm:text-sm">
        Ingresa tu correo para recibir el enlace
      </h6>
    </div>
    {message && (
      <p className="text-red-500 text-xs font-medium mb-4">{message}</p>
    )}
    {error?.length > 0 && (
        <ul className="mb-4 space-y-1">
          {error.map((err, index) => (
            <li key={index} className="text-red-500 text-xs font-medium">
            {err}
            </li>
          ))}
        </ul>
      )}
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1 text-gray-700">Correo electrónico</label>
        <input
          type="text"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border bg-gray-200 border-gray-300 rounded-md text-xs h-9 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-xs text-white font-semibold h-9 rounded-md hover:bg-green-600 transition-colors"
      >
        Enviar enlace
      </button>
      <div className="flex gap-1 justify-center">
        <p className="text-xs">¿Ya recuerdas tu contraseña?</p>
        <Link className="text-xs font-semibold text-green-500" to="/login">Inicia sesión</Link>
      </div>
    </form>
  </div>
</section>


)
}