import { useNavigate } from "react-router-dom";

export default function MyRequestClient ({requests,cancel, confirm,page, setPage, total, limit}){

const navigate=useNavigate()

return (
  <div className="p-5 max-w-3xl mx-auto">
    {console.log(requests)}
    <h1 className="text-2xl font-bold text-center mb-6">Historial de solicitudes</h1>
    {requests.map((req) => {
      const formattedHiringDate = new Date(req.hiring_date).toLocaleDateString("es-ES");
      const formattedDetailDate = req.details?.date ? new Date(req.details.date).toLocaleDateString("es-ES"): "";
      return (
        <div
          key={req._id}
          className="bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm">
          <p className="font-medium">
            <span className="font-semibold">Nombre del proveedor:</span> {req.provider_Id.name}{" "}
            {req.provider_Id.lastname}
          </p>
          <button  
            onClick={() => navigate(`/Chat/${req.chat_Id._id}`)}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            Ver Chat
          </button>
          {req.status === "en_curso" && (
            <div className="mt-3">
              <p className="text-blue-600 font-bold">Solicitud en curso</p>
              <p>Fecha de solicitud: {formattedHiringDate}</p>
              <div className="bg-gray-50 p-3 rounded-md mt-3">
                <p className="font-semibold mb-1">Detalles de la solicitud:</p>
                <p>Nombre: {req.details.name_service}</p>
                <p>Descripción: {req.details.description}</p>
                <p>Fecha: {formattedDetailDate}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => confirm(req._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Marcar la solicitud como completada
                </button>
                <button
                  onClick={() => cancel(req._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Cancelar solicitud
                </button>
              </div>
            </div>
          )}
          {req.status === "completado" && (
            <div className="mt-3">
              <p className="text-green-600 font-bold">Solicitud completada</p>
            </div>
          )}
          {req.status === "pendiente" && (
            <div className="mt-3">
              <p className="text-yellow-500 font-bold mb-2">Debes llenar el formulario de confirmación</p>
              <button
                onClick={() => navigate(`/request/${req._id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Llenar formulario
              </button>
            </div>
          )}
          {req.status === "cancelado" && (
            <div className="mt-3">
              <p className="text-red-600 font-bold">Solicitud cancelada</p>
            </div>
          )}
        </div>
      );
    })}
    <div className="flex justify-between mt-5">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className={`px-4 py-2 rounded border ${page === 1 ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}>
        Anterior
      </button>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage((p) => p + 1)}
        className={`px-4 py-2 rounded border ${page * limit >= total ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}>
        Siguiente
      </button>
    </div>
  </div>
);
}