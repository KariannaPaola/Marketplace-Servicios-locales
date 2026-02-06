import { useNavigate } from "react-router-dom";


export default function FeesList({fees, approve, reject, page, setPage, limit, total }){
const navigate=useNavigate();

return (
  <div className="p-4">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
      Gestión de pagos
    </h1>
    <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="grid grid-cols-7 gap-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 border-b">
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
          className="grid grid-cols-7 gap-4 px-4 py-3 text-sm border-b hover:bg-gray-50 transition">
          <p>{fee.provider_Id.name}</p>
          <p>{fee.provider_Id.lastname}</p>
          <p>Bs {fee.amount_bs.$numberDecimal}</p>
          <p>$ {fee.amount_usd.$numberDecimal}</p>
          <p>
            {new Date(fee.date_payment).toLocaleDateString("es-VE")}
          </p>
          <p>
            {new Date(fee.expiration_date).toLocaleDateString("es-VE")}
          </p>
          <div className="space-y-2">
            {fee.status === "pendiente" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                Pendiente
              </span>
            )}
            {fee.status === "pagado" && (
              <div className="flex flex-col gap-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  Pagado
                </span>
                <button
                  onClick={() => navigate(`/admin/fee/${fee._id}`)}
                  className="px-2 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Revisar pago
                </button>
                <button
                  onClick={() => approve(fee._id)}
                  className="px-2 py-1 text-xs rounded-md bg-green-600 text-white hover:bg-green-700">
                  Aprobar
                </button>
                <button
                  onClick={() => reject(fee._id)}
                  className="px-2 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700">
                  Rechazar
                </button>
              </div>
            )}
            {fee.status === "rechazado" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Rechazado
              </span>
            )}
            {fee.status === "aprobado" && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Aprobado
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
    <div className="md:hidden space-y-4">
      {fees.map((fee) => (
        <div
          key={fee._id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-2">
          <p><strong>Nombre:</strong> {fee.provider_Id.name}</p>
          <p><strong>Apellido:</strong> {fee.provider_Id.lastname}</p>
          <p><strong>Monto Bs:</strong> Bs {fee.amount_bs.$numberDecimal}</p>
          <p><strong>Monto USD:</strong> $ {fee.amount_usd.$numberDecimal}</p>
          <p>
            <strong>Fecha de pago:</strong>{" "}
            {new Date(fee.date_payment).toLocaleDateString("es-VE")}
          </p>
          <p>
            <strong>Vencimiento:</strong>{" "}
            {new Date(fee.expiration_date).toLocaleDateString("es-VE")}
          </p>
          <div className="pt-2">
            {fee.status === "pendiente" && (
              <span className="text-orange-600 font-medium">Pendiente</span>
            )}
            {fee.status === "pagado" && (
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => navigate(`/admin/fee/${fee._id}`)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md">
                  Revisar pago
                </button>
                <button
                  onClick={() => handleApproveFee(fee._id)}
                  className="bg-green-600 text-white px-3 py-2 rounded-md">
                  Aprobar
                </button>
                <button
                  onClick={() => handleRejectRequest(fee._id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-md">
                  Rechazar
                </button>
              </div>
            )}
            {fee.status === "rechazado" && (
              <span className="text-red-600 font-medium">Rechazado</span>
            )}
            {fee.status === "aprobado" && (
              <span className="text-green-600 font-medium">Aprobado</span>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Paginación */}
    <div className="flex justify-between items-center mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        Anterior
      </button>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage((p) => p + 1)}
        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
      >
        Siguiente
      </button>
    </div>
  </div>
);

}
