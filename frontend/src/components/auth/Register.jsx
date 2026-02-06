import { Link } from "react-router-dom";

export default function Register ({name, lastname, email,setName, setLastname, setEmail,phone_number, setPhoneNumber, password, setPassword, password_repeat, setPasswordRepeat, handleSubmit, error}){

const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit();
  };
return (
  <section className="min-h-screen flex flex-col flex items-center justify-center px-4">
    <div className="bg-white flex flex-col rounded-xl shadow-lg w-full max-w-md border border-gray-200 p-6 sm:p-8 md:p-8">
      <div className="flex flex-col">
        <h2 className="text-base sm:text-lg font-bold mb-2 text-center text-gray-800">
          Crear cuenta
        </h2>
        <h6 className="text-gray-600 text-center mb-6 text-xs sm:text-sm">
          Regístrate para empezar
        </h6>
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
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1 text-gray-700">Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border bg-gray-200 border-gray-300 rounded-md text-xs h-9 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1 text-gray-700">Apellido</label>
            <input
              type="text"
              placeholder="Ingresa tu apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="border bg-gray-200 border-gray-300 rounded-md text-xs h-9 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="border bg-gray-200 border-gray-300 rounded-md text-xs h-9 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="border bg-gray-200 border-gray-300 rounded-md text-xs h-9 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="border bg-gray-200 border-gray-300 rounded-md text-xs h-9 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="border bg-gray-200 border-gray-300 rounded-md text-xs h-9 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button type="submit" className="bg-green-500 text-xs text-white font-semibold h-9 rounded-md hover:bg-green-600 transition-colors">
          Crear una cuenta
        </button>
        <div className="flex gap-1 justify-center">
          <p className="text-xs">Ya tienes una cuenta?</p>
          <Link className="text-xs font-semibold text-green-500"  to="/login">Inicia sesión</Link>
        </div>
      </form>
    </div>
  </section>);
}