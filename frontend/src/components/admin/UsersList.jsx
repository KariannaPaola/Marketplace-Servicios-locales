export default function UsersList ({users, remove ,unDelete, page, setPage, total, limit}){

return (
  <div className="p-4">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
      Gestión de usuarios
    </h1>
    <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="grid grid-cols-7 gap-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 border-b">
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Email</p>
        <p>Teléfono</p>
        <p>Tipo</p>
        <p>Estado</p>
        <p>Acción</p>
      </div>
      {users.map((u) => (
        <div
          key={u._id}
          className="grid grid-cols-7 gap-4 px-4 py-3 text-sm border-b hover:bg-gray-50 transition">
          <p>{u.name}</p>
          <p>{u.lastname}</p>
          <p className="truncate">{u.email}</p>
          <p>{u.phone_number}</p>
          <p>{u.user_type}</p>
          <p>
            {u.is_deleted ? (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Suspendido
              </span>
            ) : (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Activo
              </span>
            )}
          </p>
          <button
            onClick={() =>
              u.is_deleted ? unDelete(u._id) : remove(u._id)}
            className={`px-3 py-1 text-xs rounded-md text-white ${u.is_deleted ? "bg-green-600 hover:bg-green-700": "bg-red-600 hover:bg-red-700"}`}>
            {u.is_deleted ? "Activar" : "Suspender"}
          </button>
        </div>
      ))}
    </div>
    <div className="md:hidden space-y-4">
      {users.map((u) => (
        <div
          key={u._id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-2">
          <p><strong>Nombre:</strong> {u.name}</p>
          <p><strong>Apellido:</strong> {u.lastname}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Teléfono:</strong> {u.phone_number}</p>
          <p><strong>Tipo:</strong> {u.user_type}</p>
          <p>
            <strong>Estado:</strong>{" "}
            {u.is_deleted ? (
              <span className="text-red-600 font-medium">Suspendido</span>
            ) : (
              <span className="text-green-600 font-medium">Activo</span>
            )}
          </p>
          <button
            onClick={() =>u.is_deleted ? unDelete(u._id) : remove(u._id)}
            className={`w-full mt-2 px-3 py-2 rounded-md text-white ${u.is_deleted ? "bg-green-600": "bg-red-600"}`}>
            {u.is_deleted ? "Activar" : "Suspender"}
          </button>
        </div>
      ))}
    </div>
    <div className="flex justify-between items-center mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100">
        Anterior
      </button>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage((p) => p + 1)}
        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100">
        Siguiente
      </button>
    </div>
  </div>
);
}