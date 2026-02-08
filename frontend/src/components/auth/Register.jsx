import { Link } from "react-router-dom";

export default function Register ({name, lastname, message, email,setName, setLastname, setEmail,phone_number, setPhoneNumber, password, setPassword, password_repeat, setPasswordRepeat, handleSubmit, error}){

const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit();
  };
return (
  <section className="min-h-screen flex items-center justify-center px-4">
    {console.log(error)}
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Crear cuenta
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Regístrate para empezar
        </p>
      </div>
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
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
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col">
            <label className="text-xs font-medium mb-1 text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-xs font-medium mb-1 text-gray-700">Apellido</label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1 text-gray-700">Correo electrónico</label>
          <input
            type="email"
            placeholder="tucorreo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1 text-gray-700">Teléfono</label>
          <input
            type="text"
            placeholder="+584143417985"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1 text-gray-700">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1 text-gray-700">Confirmar contraseña</label>
          <input
            type="password"
            placeholder="••••••••••"
            value={password_repeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            required
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-green-500 text-sm font-semibold text-white hover:bg-green-600 active:scale-[0.98] transition-all shadow-sm">
          Crear una cuenta
        </button>
        <div className="flex justify-center gap-1 text-xs text-gray-600">
          <span>Ya tienes una cuenta?</span>
          <Link
            to="/login"
            className="font-semibold text-green-600 hover:text-green-700 transition-colors">
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  </section>
);
}