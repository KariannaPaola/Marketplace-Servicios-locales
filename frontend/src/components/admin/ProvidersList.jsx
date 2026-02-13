/**
 * ProvidersList
 * ------------------------------------------------------------
 * Componente administrativo para la gestión de proveedores.
 * Renderiza una lista responsive con información del proveedor,
 * sus servicios, estado de aprobación y acceso a documentos.
 *
 * Soporta dos vistas:
 * - Tabla para pantallas medianas y grandes
 * - Tarjetas para dispositivos móviles
 *
 * Props:
 * @param {Array<Object>} providers - Lista de proveedores a mostrar.
 * @param {string} providers[].\_id - Identificador único del proveedor.
 * @param {Object} providers[].user_Id - Usuario asociado al proveedor.
 * @param {string} providers[].user_Id._id - ID del usuario.
 * @param {string} providers[].user_Id.name - Nombre del usuario.
 * @param {string} providers[].user_Id.lastname - Apellido del usuario.
 * @param {Object} providers[].categories - Categoría del proveedor.
 * @param {string} providers[].categories.name - Nombre de la categoría.
 * @param {string} providers[].profession - Profesión del proveedor.
 * @param {string} providers[].description - Descripción del proveedor.
 * @param {boolean} providers[].profile_visible - Indica si el perfil es visible.
 * @param {Array<Object>} providers[].services_offered - Servicios ofrecidos.
 * @param {string} providers[].services_offered[].\_id - ID del servicio.
 * @param {string} providers[].services_offered[].name_service - Nombre del servicio.
 * @param {number|string} providers[].services_offered[].price - Precio del servicio.
 * @param {string} providers[].status - Estado del proveedor
 * ("approved" | "rejected" | "pending").
 *
 * @param {number} page - Página actual de la paginación.
 * @param {Function} setPage - Setter para cambiar la página.
 * @param {number} total - Total de registros disponibles.
 * @param {number} limit - Cantidad de registros por página.
 *
 * @param {Function} approve - Función para aprobar un proveedor.
 * Recibe como argumento el id del proveedor.
 *
 * @param {Function} rejected - Función para rechazar un proveedor.
 * Recibe como argumento el id del proveedor.
 *
 * @param {boolean} loading - Indica si los datos están cargando.
 *
 * Comportamiento:
 * - Muestra información detallada del proveedor y sus servicios.
 * - Permite aprobar o rechazar proveedores en estado "pending".
 * - Incluye navegación a documentos del proveedor.
 * - Incluye controles de paginación.
 *
 * Dependencias externas:
 * - react-router-dom (Link)
 */

import { Link } from "react-router-dom";
export default function ProvidersList ({providers,page, setPage, total, limit, approve, rejected, loading}){

  
return (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-lg font-bold text-zinc-300 mb-8">
      Gestión de proveedores
    </h1>
    <div className="hidden md:block overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="grid grid-cols-9 gap-4 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600 border-b">
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Categoría</p>
        <p>Profesión</p>
        <p>Descripción</p>
        <p>Perfil</p>
        <p>Servicios</p>
        <p>Status</p>
        <p className="text-center">Documentos</p>
      </div>
      {providers.map((provider) => (
        <div
          key={provider._id}
          className="grid grid-cols-9 gap-4 px-6 py-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
          <p className="font-medium">{provider?.user_Id.name}</p>
          <p className="font-medium">{provider.user_Id.lastname}</p>
          <p className="capitalize">{provider.categories.name}</p>
          <p>{provider.profession}</p>
          <p className="truncate text-gray-600">
            {provider.description}
          </p>
          <p>
            {provider.profile_visible ? (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Visible
              </span>
            ) : (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                No visible
              </span>
            )}
          </p>
          <div className="space-y-2">
            {provider.services_offered.map((ser) => (
              <div
                key={ser._id}
                className="bg-gray-50 border rounded-lg px-2 py-1">
                <p className="text-xs font-semibold text-gray-700">
                  {ser.name_service}
                </p>
                <p className="text-xs text-gray-500">
                  ${ser.price}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {provider.status === "approved" && (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Aprobado
              </span>
            )}
            {provider.status === "rejected" && (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Rechazado
              </span>
            )}
            {provider.status === "pending" && (
              <div className="flex flex-col gap-2">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                  Pendiente
                </span>
                <button
                  onClick={() => approve(provider._id)}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                  Aprobar
                </button>
                <button
                  onClick={() => rejected(provider._id)}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                  Rechazar
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Link
              to={`/admin/file/${provider.user_Id._id}`}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline">
              Ver documentos
            </Link>
          </div>
        </div>
      ))}
    </div>
    <div className="md:hidden space-y-5">
      {providers.map((provider) => (
        <div key={provider._id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">
                {provider.user_Id.name} {provider.user_Id.lastname}
              </p>
              <p className="text-sm text-gray-500">
                {provider.profession}
              </p>
            </div>
            {provider.status === "approved" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Aprobado
              </span>
            )}
            {provider.status === "rejected" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Rechazado
              </span>
            )}
            {provider.status === "pending" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                Pendiente
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {provider.description}
          </p>
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Categoría:</span> {provider.categories.name}</p>
            <p>
              <span className="font-medium">Perfil:</span>{" "}
              {provider.profile_visible ? (
                <span className="text-green-600 font-medium">Visible</span>
              ) : (
                <span className="text-red-600 font-medium">No visible</span>
              )}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Servicios</p>
            <div className="space-y-1">
              {provider.services_offered.map((ser) => (
                <div
                  key={ser._id}
                  className="flex justify-between text-sm text-gray-600 bg-gray-50 rounded-md px-2 py-1">
                  <span>{ser.name_service}</span>
                  <span>${ser.price}</span>
                </div>
              ))}
            </div>
          </div>
          {provider.status === "pending" && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => approve(provider._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                Aprobar
              </button>
              <button
                onClick={() => rejected(provider._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                Rechazar
              </button>
            </div>
          )}
          <Link
            to={`/admin/file/${provider.user_Id._id}`}
            className="block text-center text-blue-600 font-semibold text-sm hover:underline pt-2">
            Ver documentos
          </Link>
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