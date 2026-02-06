export default function ProfileProviderClient ({profileProvider}){

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
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
            </div>
          ))}
        </div>
      </div>
      <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition rounded-xl py-3 text-white font-semibold">
        Empezar a cotizar
      </button>
    </div>
  </div>
);
}