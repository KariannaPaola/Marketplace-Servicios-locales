export default function MyProfileProvider ({profile, onEdit} ){

return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-900 text-center">
        Mi perfil
      </h1>
      <div className="text-center border-b pb-4">
        <p className="text-lg font-semibold text-gray-900">
          {profile.user_Id.name} {profile.user_Id.lastname}
        </p>
        <p className="text-sm text-gray-500">
          {profile.profession}
        </p>
      </div>
      <div>
        <h6 className="text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">
          Información
        </h6>
        <p></p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {profile.description}
        </p>
      </div>
      <div>
        <h6 className="text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
          Servicios ofrecidos
        </h6>
        <div className="flex flex-col gap-3">
          {profile.services_offered.map((service, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
              <span className="text-sm text-gray-800">
                {service.name_service}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                ${service.price}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onEdit} className="mt-2 w-full bg-gray-900 hover:bg-gray-800 transition text-white font-semibold py-3 rounded-xl">
        Editar perfil
      </button>
    </div>
  </div>
);
}