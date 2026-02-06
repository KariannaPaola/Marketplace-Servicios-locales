import { useNavigate } from "react-router-dom";
export default function MyFeesProvider ({fees,page, setPage, total, limit} ){
const navigate= useNavigate()
return (
  <div className="p-5 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold text-center mb-6">
      Historial de pagos y tarifas
    </h1>
    {fees.map((fee) => {
      const formattedExpirationDate = fee.expiration_date
        ? new Date(fee.expiration_date).toLocaleDateString("es-ES")
        : "";
      return (
        <div key={fee._id} className="bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm">
          <p className="font-medium">
            <span className="font-semibold">Monto en Bs:</span>{" "}
            {fee.amount_bs.$numberDecimal}
          </p>
          <p className="font-medium">
            <span className="font-semibold">Fecha de expiración:</span>{" "}
            {formattedExpirationDate}
          </p>
          {fee.status === "pendiente" && (
            <div className="mt-3">
              <p className="text-yellow-500 font-bold">Pago pendiente</p>
              <button
                onClick={() => navigate(`/provider/payfee/${fee._id}`)}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Entrar para pagar tu tarifa
              </button>
            </div>
          )}
          {fee.status === "pagado" && (
            <div className="mt-3">
              <p className="text-blue-600 font-bold">
                Pago pendiente por aprobar
              </p>
            </div>
          )}
          {fee.status === "rechazado" && (
            <div className="mt-3">
              <p className="text-red-600 font-bold">Pago rechazado</p>
              <button
                onClick={() => navigate(`/provider/payfee/${fee._id}`)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Enviar referencia de nuevo
              </button>
            </div>
          )}
          {fee.status === "aprobado" && (
            <div className="mt-3">
              <p className="text-green-600 font-bold">
                Su pago fue aprobado
              </p>
            </div>
          )}
        </div>
      );
    })}
    <div className="flex justify-between mt-5">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className={`px-4 py-2 rounded border ${page === 1 ? "bg-gray-100 cursor-not-allowed": "bg-white hover:bg-gray-50"}`}>
        Anterior
      </button>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage((p) => p + 1)}
        className={`px-4 py-2 rounded border ${ page * limit >= total ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}>
        Siguiente
      </button>
    </div>
  </div>
);
}