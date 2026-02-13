/**
 * ChangePassword
 * ------------------------------------------------------------
 * Componente para cambiar la contraseña del usuario.
 * Permite ingresar y confirmar la nueva contraseña.
 * 
 * Props:
 * @param {string} password - La nueva contraseña ingresada por el usuario.
 * @param {Function} setPassword - Setter para actualizar la nueva contraseña.
 * @param {string} newPassword_repeat - Confirmación de la nueva contraseña.
 * @param {Function} setNewPassword_repeat - Setter para actualizar la confirmación de la nueva contraseña.
 * @param {Function} change - Función a ejecutar al enviar el formulario, para cambiar la contraseña.
 * 
 * Comportamiento:
 * - Muestra dos campos de entrada de contraseña: uno para la nueva y otro para la confirmación.
 * - Ambos campos deben coincidir para poder enviar el formulario.
 * - Al enviar, ejecuta la función `change` que gestiona el cambio de contraseña.
 */

export default function ChangePassword ({password, setPassword,newPassword_repeat, setNewPassword_repeat ,change}){

return (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Cambiar contraseña
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Ingresa tu nueva contraseña dos veces
        </p>
      </div>
      <form onSubmit={change} className="space-y-5">
        <div className="flex flex-col">
          <label className="text-xs font-medium mb-1 text-gray-700">Nueva contraseña</label>
          <input
            type="password"
            placeholder="Ingresa la nueva contraseña"
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
            placeholder="Ingresa otra vez la contraseña"
            value={newPassword_repeat}
            onChange={(e) => setNewPassword_repeat(e.target.value)}
            required
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-green-500 text-sm font-semibold text-white hover:bg-green-600 active:scale-[0.98] transition-all shadow-sm">
          Cambiar contraseña
        </button>
      </form>
    </div>
  </section>
);
}