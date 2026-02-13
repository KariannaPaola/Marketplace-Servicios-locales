/**
 * VerifyFee
 * ------------------------------------------------------------
 * Componente encargado de verificar una tarifa de pago.
 * Muestra los detalles de la tarifa y permite aprobar o rechazar el pago.
 *
 * Props:
 * @param {Object} fee - La tarifa de pago a verificar.
 * @param {string} fee._id - ID de la tarifa.
 * @param {string} fee.payment_reference - Referencia de pago.
 * @param {string} fee.status - Estado de la tarifa ("pagado", "aprobado", "rechazado").
 * @param {Object} fee.provider_Id - Información del proveedor.
 * @param {string} fee.provider_Id.name - Nombre del proveedor.
 * @param {string} fee.provider_Id.lastname - Apellido del proveedor.
 * @param {string} fee.date_payment - Fecha de pago (si existe).
 * 
 * @param {Function} approve - Función para aprobar la tarifa de pago.
 * Recibe el ID de la tarifa.
 * 
 * @param {Function} reject - Función para rechazar la tarifa de pago.
 * Recibe el ID de la tarifa.
 * 
 * Comportamiento:
 * - Muestra información detallada de la tarifa, incluyendo referencia, fecha de pago y proveedor.
 * - Permite aprobar o rechazar la tarifa según su estado.
 * - Muestra mensajes de éxito o error dependiendo del estado de la tarifa.
 */

export default function VerifyFee({fee, approve, reject}){

return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Verificar referencia
      </h1>
      {!fee && (
        <p className="text-center text-gray-500">
          Cargando tarifa...
        </p>
      )}
      {fee && fee.status === "pagado" && (() => {
        const formattedPaymentDate = fee.date_payment
          ? new Date(fee.date_payment).toLocaleDateString("es-ES")
          : "";
        return (
          <>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-5 text-sm space-y-2">
              <p>
                <span className="font-semibold">Referencia:</span>{" "}
                {fee.payment_reference}
              </p>
              <p>
                <span className="font-semibold">Fecha de pago:</span>{" "}
                {formattedPaymentDate}
              </p>
              <p>
                <span className="font-semibold">Proveedor:</span>{" "}
                {fee.provider_Id.name} {fee.provider_Id.lastname}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => approve(fee._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors">
                Aprobar
              </button>
              <button
                onClick={() => reject(fee._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors">
                Rechazar
              </button>
            </div>
          </>
        );
      })()}
      {fee && fee.status === "aprobado" && (
        <p className="text-center text-green-600 font-bold">
          Pago aprobado con éxito
        </p>
      )}
      {fee && fee.status === "rechazado" && (
        <p className="text-center text-red-600 font-bold">
          Pago rechazado con éxito
        </p>
      )}
    </div>
  </div>
);
}