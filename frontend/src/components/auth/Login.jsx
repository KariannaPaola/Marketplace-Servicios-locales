import { Link } from "react-router-dom";

export default function Login ({email, setEmail,password, setPassword, handleSubmit, setError, error}){

  const onSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    await handleSubmit();
  };

  return(
  <section className="min-h-screen flex items-center w-full justify-center px-4" >
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200 p-8  md:p-10">
      <div className="flex flex-col">
        <h2 className="text-base font-bold mb-2 text-center text-gray-800 sm:text-lg ">Bienvenido de nuevo</h2>
        <h6 className="text-gray-600 text-center mb-6 text-xs sm:text-sm ">Inicia sesión para entrar en tu cuenta</h6>
      </div>
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
          <label htmlFor="email" className="text-xs font-medium mb-1  text-gray-700">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="tucorreo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border bg-gray-200 border-gray-300 rounded-md text-xs h-8 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-xs font-medium mb-1 text-gray-700">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border bg-gray-200 border-gray-300 text-xs rounded-md p-2 h-8 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex justify-end">
          <Link className="text-xs"  to="/recoverPassword">Olvidaste tu contraseña?</Link>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-xs text-white text-center font-semibold  h-8 rounded-md hover:bg-green-600 transition-colors">
          Iniciar sesión
        </button>
        <div className="flex gap-1 justify-center">
          <p className="text-xs ">No tienes cuenta?</p>
          <Link className="text-xs font-semibold text-green-500"  to="/register">Crear una cuenta</Link>
        </div>
      </form>
    </div>
  </section>
)
}