import { createChat } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function ProfileProviderClient ({profileProvider, error}){
  const navigate= useNavigate()
  if (!profileProvider?.user_Id) {
    return <p>Cargando perfil...</p>;
  }
return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="text-center border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {console.log(profileProvider)}
          {profileProvider.user_Id.name} {profileProvider.user_Id.lastname}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {profileProvider.profession}
        </p>
      </div>
      <div>
        <h6 className="text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
          Información
        </h6>
        <p className="text-sm text-gray-600 leading-relaxed">
          {profileProvider.description}
        </p>
      </div>
      <div>
        <h6 className="text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
          Servicios ofrecidos
        </h6>
        <div className="flex flex-col gap-3">
          {profileProvider.services_offered.map((service, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
              <span className="text-sm text-gray-800">
                {service.name_service}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                ${service.price}
              </span>
              <button
                onClick={async () => {
                  try {
                    const data = await createChat(profileProvider.user_Id._id);
                    navigate(`/Chat/${data.chat._id}`);
                  } catch (error) {
                    console.error("Error al crear chat:", error);
                  }
                }}
                className="bg-green-600 hover:bg-green-700  text-xs  text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Empezar a cotizar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}