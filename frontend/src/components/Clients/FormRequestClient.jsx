export default function FormRequestClient ({handleSubmitForm, name_service,setName_service, date ,setDate, description, setDescription}){

return (
  <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-3 font-sans">
    <div className="flex flex-col gap-5 mb-2">
      <h2 className="text-2xl font-bold text-center ">Nueva solicitud de servicio</h2>
      <p className="text-center text-gray-600">
        Complete los datos para contratar un proveedor de servicios
      </p>
    </div>
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Nombre del servicio</label>
        <input
          type="text"
          placeholder="Nombre del servicio"
          value={name_service}
          onChange={(e) => setName_service(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Fecha acordada del servicio</label>
        <input
          type="date"
          placeholder="Fecha del servicio acordada"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Detalles adicionales del servicio</label>
        <input
          type="text"
          placeholder="Detalles adicionales del servicio"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <button
        type="submit"
        className="mt-2 p-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors">
        Enviar formulario
      </button>
    </form>
    <div className="bg-orange-100 border border-solid border-orange-500  rounded-md">
      <p className="text-gray-600 p-2 ">
        Aviso importante: Solo confirme si está seguro de contratar este servicio. Los usuarios con más de dos cancelaciones de servicios podrían ser suspendidos.
      </p>
    </div>
  </div>
);
}