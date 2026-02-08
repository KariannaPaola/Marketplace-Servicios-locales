import { useNavigate } from "react-router-dom";
import { createChat } from "../../services/auth";

export default function GetProvidersSearch ({providers,page, setPage, total, limit, loading}){

const navigate=useNavigate()

if (loading) return <p>Cargando proveedores</p>
return (
  <div className="w-full flex flex-col items-center">
    <div className="w-full max-w-7xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {providers.map((provider) => (
        <div key={provider._id} className="h-[300px] bg-gray-200 rounded-xl shadow-lg p-4 flex flex-col gap-3 justify-between">
          <div className="flex-4 bg-gray-100 rounded-lg flex items-center justify-center">
          </div>
          <div className="flex-2 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-800">
                {provider.user_Id?.name} {provider.user_Id?.lastname}
              </p>
              <p className="text-xs text-gray-500">
                {provider.profession}
              </p>
            </div>
            <div className="flex gap-6">
              <p className="text-sm text-gray-600">
                {provider.rating}
              </p>
              <p className="text-sm text-gray-600">
                {provider.state?.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate(`/profileProvider/${provider.user_Id._id}`)}
              className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors">
              Ver perfil completo y tarifas
            </button>
            <button
              onClick={async () => {
                try {
                  const data = await createChat(provider.user_Id._id);
                  console.log(data)
                  navigate(`/Chat/${data.chat._id}`);
                } catch (error) {
                  console.error("Error al crear chat:", error);
                }
              }}
              className="bg-green-600 hover:bg-green-700  text-xs  text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Empezar a cotizar
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="flex gap-4 py-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">
        Anterior
      </button>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage(p => p + 1)}
        className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">
        Siguiente
      </button>
    </div>
  </div>
);
}