/**
 * FeesList
 * ------------------------------------------------------------
 * Componente para la gestión y visualización de pagos (fees)
 * en el panel administrativo.
 *
 * Soporta vista responsive:
 * - Tabla para pantallas medianas/grandes
 * - Tarjetas para dispositivos móviles
 *
 * Props:
 * @param {Array<Object>} fees - Lista de pagos a mostrar.
 * @param {string} fees[].\_id - Identificador único del pago.
 * @param {Object} fees[].provider_Id - Proveedor asociado al pago.
 * @param {string} fees[].provider_Id.name - Nombre del proveedor.
 * @param {string} fees[].provider_Id.lastname - Apellido del proveedor.
 * @param {Object} fees[].amount_usd - Monto en dólares (Decimal).
 * @param {string} fees[].amount_usd.$numberDecimal - Valor del monto en USD.
 * @param {string|null} fees[].date_payment - Fecha de pago (si existe).
 * @param {string} fees[].expiration_date - Fecha de vencimiento.
 * @param {string} fees[].status - Estado del pago
 * ("pendiente" | "pagado" | "rechazado" | "aprobado").
 *
 * @param {Function} approve - Función para aprobar un pago.
 * Recibe como argumento el id del pago.
 *
 * @param {Function} reject - Función para rechazar un pago.
 * Recibe como argumento el id del pago.
 *
 * @param {number} page - Página actual de la paginación.
 * @param {Function} setPage - Setter para cambiar la página.
 *
 * @param {number} limit - Cantidad de registros por página.
 * @param {number} total - Total de registros disponibles.
 *
 * @param {Object} feeApi - Información adicional de la API de pagos.
 * @param {Object} feeApi.data - Datos devueltos por la API.
 * @param {number} feeApi.data.promedio - Valor promedio usado para el cálculo en Bs.
 *
 * @param {boolean} loading - Indica si los datos están cargando.
 *
 * Comportamiento:
 * - Muestra un estado de carga mientras `loading` es true.
 * - Permite navegar al detalle del pago.
 * - Permite aprobar o rechazar pagos en estado "pagado".
 * - Incluye controles de paginación.
 *
 * Dependencias externas:
 * - react-router-dom (useNavigate)
 */

import { useNavigate } from "react-router-dom";
export default function FeesList({fees, approve, reject, page, setPage, limit, total, feeApi, loading }){
const navigate=useNavigate();

if (loading) return <p>Cargando...</p>

return (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-lg font-bold text-zinc-300 mb-8">
      Gestión de pagos
    </h1>
    <div className="hidden md:block overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="grid grid-cols-7 gap-4 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600 border-b">
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Monto Bs</p>
        <p>Monto USD</p>
        <p>Fecha de pago</p>
        <p>Vencimiento</p>
        <p>Status</p>
      </div>
      {fees.map((fee) => (
        <div
          key={fee._id}
          className="grid grid-cols-7 gap-4 px-6 py-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
          <p className="font-medium">{fee.provider_Id.name}</p>
          <p className="font-medium">{fee.provider_Id.lastname}</p>
          <p className="text-gray-600">
            Bs {Math.ceil(feeApi?.data.promedio*5) }
          </p>
          <p className="text-gray-600">
            $ {fee.amount_usd.$numberDecimal}
          </p>
          <p className="text-gray-600">
            {fee.date_payment !== null &&
              new Date(fee.date_payment).toLocaleDateString("es-VE")}
          </p>
          <p className="text-gray-600">
            {new Date(fee.expiration_date).toLocaleDateString("es-VE")}
          </p>
          <div className="space-y-2">
            {fee.status === "pendiente" && (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                Pendiente
              </span>
            )}
            {fee.status === "pagado" && (
              <div className="flex flex-col gap-2">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  Pagado
                </span>
                <button
                  onClick={() => navigate(`/admin/fee/${fee._id}`)}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                  Revisar pago
                </button>
                <button
                  onClick={() => approve(fee._id)}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                  Aprobar
                </button>
                <button
                  onClick={() => reject(fee._id)}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                  Rechazar
                </button>
              </div>
            )}
            {fee.status === "rechazado" && (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Rechazado
              </span>
            )}
            {fee.status === "aprobado" && (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Aprobado
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
    <div className="md:hidden space-y-5">
      {fees.map((fee) => (
        <div
          key={fee._id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">
                {fee.provider_Id.name} {fee.provider_Id.lastname}
              </p>
              <p className="text-sm text-gray-500">
                Vence:{" "}
                {new Date(fee.expiration_date).toLocaleDateString("es-VE")}
              </p>
            </div>
            {fee.status === "pendiente" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                Pendiente
              </span>
            )}
            {fee.status === "pagado" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                Pagado
              </span>
            )}
            {fee.status === "rechazado" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Rechazado
              </span>
            )}
            {fee.status === "aprobado" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Aprobado
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <p>Bs {Math.ceil(feeApi?.data.promedio*5) }</p>
            <p>$ {fee.amount_usd.$numberDecimal}</p>
            {fee.date_payment && (
              <p className="col-span-2">
                Pagado:{" "}
                {new Date(fee.date_payment).toLocaleDateString("es-VE")}
              </p>
            )}
          </div>
          {fee.status === "pagado" && (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => navigate(`/admin/fee/${fee._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                Revisar pago
              </button>
              <button
                onClick={() => approve(fee._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                Aprobar
              </button>
              <button
                onClick={() => reject(fee._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                Rechazar
              </button>
            </div>
          )}
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
