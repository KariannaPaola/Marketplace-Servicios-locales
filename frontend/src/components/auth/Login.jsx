import { Link } from "react-router-dom";

export default function Login ({email, setEmail,password, setPassword, handleSubmit, setError, error}){

  const onSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    await handleSubmit();
  };

  return (
  <section className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-8 md:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido de nuevo
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Inicia sesión para acceder a tu cuenta
        </p>
      </div>
      {error?.length > 0 && (
        <ul className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 space-y-1">
          {error.map((err, index) => (
            <li key={index} className="text-xs font-medium text-red-600">
              {err}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tucorreo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
          />
        </div>
        <div className="flex justify-end">
          <Link
            to="/recoverPassword"
            className="text-xs font-medium text-green-600 hover:text-green-700 transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-green-500 text-sm font-semibold text-white hover:bg-green-600 active:scale-[0.98] transition-all shadow-sm">
          Iniciar sesión
        </button>
        <div className="flex justify-center gap-1 text-xs text-gray-600">
          <span>No tienes cuenta?</span>
          <Link
            to="/register"
            className="font-semibold text-green-600 hover:text-green-700 transition-colors">
            Crear una cuenta
          </Link>
        </div>
      </form>
    </div>
  </section>
);
}