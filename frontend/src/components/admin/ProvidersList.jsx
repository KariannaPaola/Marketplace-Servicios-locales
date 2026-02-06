import { Link } from "react-router-dom";
export default function ProvidersList ({providers,page, setPage, total, limit, approve, rejected}){

return (
  <div className="p-4">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
      Gestión de proveedores
    </h1>
    <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="grid grid-cols-9 gap-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 border-b">
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Categoría</p>
        <p>Profesión</p>
        <p>Descripción</p>
        <p>Perfil</p>
        <p>Servicios</p>
        <p>Status</p>
        <p>Documentos de identidad</p>
      </div>
      {providers.map((provider) => (
        <div
          key={provider._id}
          className="grid grid-cols-9 gap-4 px-4 py-3 text-sm border-b hover:bg-gray-50 transition">
          <p>{provider.user_Id.name}</p>
          {console.log(provider)}
          <p>{provider.user_Id.lastname}</p>
          <p>{provider.categories.name}</p>
          <p>{provider.profession}</p>
          <p className="truncate">{provider.description}</p>
          <p>
            {provider.profile_visible===true ? (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Visible
              </span>
            ) : (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                No visible
              </span>
            )}
          </p>
          <div className="space-y-1">
            {provider.services_offered.map((ser) => (
              <div key={ser._id} className="text-xs text-gray-600">
                <p className="font-medium">{ser.name_service}</p>
                <p>${ser.price}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {provider.status === "approved" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Aprobado
              </span>
            )}
            {provider.status === "rejected" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Rechazado
              </span>
            )}
            {provider.status === "pending" && (
              <div className="flex flex-col gap-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                  Pendiente
                </span>
                <button
                  onClick={() => approve(provider._id)}
                  className="px-2 py-1 text-xs rounded-md bg-green-600 text-white hover:bg-green-700">
                  Aprobar
                </button>
                <button
                  onClick={() => rejected(provider._id)}
                  className="px-2 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700">
                  Rechazar
                </button>
              </div>
            )}
          </div>
          <div>
          <Link to={`/admin/file/${provider.user_Id._id}`}>
              Ver documentos
          </Link>
          </div>
        </div>
      ))}
    </div>
    <div className="md:hidden space-y-4">
      {providers.map((provider) => (
        <div
          key={provider._id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-2">
          <p><strong>Nombre:</strong> {provider.user_Id.name}</p>
          <p><strong>Apellido:</strong> {provider.user_Id.lastname}</p>
          <p><strong>Categoría:</strong> {provider.categories.name}</p>
          <p><strong>Profesión:</strong> {provider.profession}</p>
          <p className="text-sm text-gray-600">{provider.description}</p>
          <p>
            <strong>Perfil:</strong>{" "}
            {provider.profile_visible ? (
              <span className="text-green-600 font-medium">Visible</span>
            ) : (
              <span className="text-red-600 font-medium">No visible</span>
            )}
          </p>
          <div>
            <strong>Servicios:</strong>
            <div className="mt-1 space-y-1">
              {provider.services_offered.map((ser) => (
                <div key={ser._id} className="text-sm text-gray-600">
                  {ser.name_service} — ${ser.price}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2">
            {provider.status === "approved" && (
              <span className="text-green-600 font-medium">Aprobado</span>
            )}
            {provider.status === "rejected" && (
              <span className="text-red-600 font-medium">Rechazado</span>
            )}
            {provider.status === "pending" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleApproveProvider(provider._id)}
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md">
                  Aprobar
                </button>
                <button
                  onClick={() => handleDisapproveProvider(provider._id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md">
                  Rechazar
                </button>
              </div>
            )}
          </div>
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