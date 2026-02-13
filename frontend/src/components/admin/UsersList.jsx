/**
 * UsersList
 * ------------------------------------------------------------
 * Componente administrativo para la gestión de usuarios.
 * Permite visualizar usuarios, suspenderlos o reactivarlos,
 * y navegar entre páginas de resultados.
 *
 * Incluye diseño responsive:
 * - Tabla para pantallas medianas/grandes
 * - Tarjetas para dispositivos móviles
 *
 * Props:
 * @param {Array<Object>} users - Lista de usuarios a mostrar.
 * @param {string} users[].\_id - Identificador único del usuario.
 * @param {string} users[].name - Nombre del usuario.
 * @param {string} users[].lastname - Apellido del usuario.
 * @param {string} users[].email - Correo electrónico.
 * @param {string} users[].phone_number - Número de teléfono.
 * @param {string} users[].user_type - Tipo de usuario.
 * @param {boolean} users[].is_deleted - Indica si el usuario está suspendido.
 *
 * @param {Function} remove - Función para suspender un usuario.
 * Recibe como argumento el id del usuario.
 *
 * @param {Function} unDelete - Función para reactivar un usuario suspendido.
 * Recibe como argumento el id del usuario.
 *
 * @param {number} page - Página actual de la paginación.
 * @param {Function} setPage - Setter para cambiar la página.
 * @param {number} total - Total de registros disponibles.
 * @param {number} limit - Cantidad de registros por página.
 *
 * Comportamiento:
 * - Muestra estado "Activo" o "Suspendido".
 * - Permite suspender o reactivar usuarios.
 * - Incluye controles de paginación.
 */

export default function UsersList ({users, remove ,unDelete, page, setPage, total, limit}){

return (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-lg font-bold text-zinc-300 mb-8">
      Gestión de usuarios
    </h1>
    <div className="hidden md:block overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="grid grid-cols-7 gap-4 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600 border-b">
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Email</p>
        <p>Teléfono</p>
        <p>Tipo</p>
        <p>Estado</p>
        <p className="text-center">Acción</p>
      </div>
      {users.map((u) => (
        <div
          key={u._id}
          className="grid grid-cols-7 gap-4 px-6 py-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
          <p className="font-medium">{u.name}</p>
          <p className="font-medium">{u.lastname}</p>
          <p className="truncate text-gray-600">{u.email}</p>
          <p>{u.phone_number}</p>
          <p className="capitalize">{u.user_type}</p>
          <p>
            {u.is_deleted ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Suspendido
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Activo
              </span>
            )}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => u.is_deleted ? unDelete(u._id) : remove(u._id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg text-white transition-all shadow-sm
                ${u.is_deleted 
                  ? "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400" 
                  : "bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                }`}>
              {u.is_deleted ? "Activar" : "Suspender"}
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="md:hidden space-y-5">
      {users.map((u) => (
        <div key={u._id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">
                {u.name} {u.lastname}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {u.email}
              </p>
            </div>
            {u.is_deleted ? (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Suspendido
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Activo
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Teléfono:</span> {u.phone_number}</p>
            <p><span className="font-medium">Tipo:</span> {u.user_type}</p>
          </div>
          <button
            onClick={() => u.is_deleted ? unDelete(u._id) : remove(u._id)}
            className={`w-full mt-4 px-4 py-2 rounded-lg font-semibold text-white transition-all shadow-sm
              ${u.is_deleted 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-red-600 hover:bg-red-700"
              }`}>
            {u.is_deleted ? "Activar usuario" : "Suspender usuario"}
          </button>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center mt-10">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="px-5 py-2 rounded-lg border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
        ← Anterior
      </button>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage((p) => p + 1)}
        className="px-5 py-2 rounded-lg border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
        Siguiente →
      </button>
    </div>
  </div>
);
}