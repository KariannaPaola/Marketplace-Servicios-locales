/**
 * RegisterProviderForm
 * ------------------------------------------------------------
 * Formulario para que los usuarios se registren como proveedores de servicios.
 * Permite ingresar información profesional, seleccionar categorías y estados,
 * y agregar múltiples servicios con sus respectivos precios.
 *
 * Props:
 * @param {string} error - Mensaje de error general.
 * @param {string} message - Mensaje de éxito o confirmación.
 * @param {Function} infoSubmit - Función que se ejecuta al enviar el formulario.
 * @param {string} profession - Nombre del oficio/profesión del proveedor.
 * @param {Function} setProfession - Setter para actualizar la profesión.
 * @param {string} description - Breve descripción del proveedor.
 * @param {Function} setDescription - Setter para actualizar la descripción.
 * @param {Array<Object>} categories - Lista de categorías disponibles.
 * @param {string} categoriaSeleccionada - ID de la categoría seleccionada.
 * @param {Function} setCategoriaSeleccionada - Setter para actualizar la categoría seleccionada.
 * @param {Array<Object>} states - Lista de estados disponibles.
 * @param {string} estadoSeleccionado - ID del estado seleccionado.
 * @param {Function} setEstadoSeleccionado - Setter para actualizar el estado seleccionado.
 * @param {Array<Object>} services - Lista de servicios agregados por el proveedor.
 * @param {Function} handleServiceChange - Función para actualizar nombre o precio de un servicio.
 * @param {Function} removeService - Función para eliminar un servicio de la lista.
 * @param {Function} addService - Función para agregar un nuevo servicio.
 *
 * Comportamiento:
 * - Permite ingresar información profesional y descripción del proveedor.
 * - Permite seleccionar categoría y estado.
 * - Permite agregar, modificar y eliminar servicios con precios.
 * - Ejecuta `infoSubmit` al enviar el formulario.
 */

export default function RegisterProviderForm ({error, message, infoSubmit,profession, setProfession, description,setDescription,categories, categoriaSeleccionada, setCategoriaSeleccionada, states, estadoSeleccionado, setEstadoSeleccionado, services, handleServiceChange, removeService, addService}){
const onSubmit = async (e) => {
    e.preventDefault();
    await infoSubmit();
  };
return (
  <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-5xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Empieza a ofrecer tu servicios
        </h2>
        <h6 className="text-gray-600 mt-2">
          Y aumenta tu red de clientes
        </h6>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h6 className="text-lg font-semibold text-gray-800 mb-4">
            Paso 1: Información profesional
          </h6>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Categoría del servicio
          </label>
          <select
            id="category"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <option value="">Selecciona una categoria</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
              ))}
          </select>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Ingresa tu oficio
          </label>
          <input
            type="text"
            placeholder="Plomero"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            type="text"
            placeholder="Ingresa una breve descripción de tu perfil profesional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="state"
            value={estadoSeleccionado}
            onChange={(e) => setEstadoSeleccionado(e.target.value)}
            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Selecciona un estado</option>
              {states.map((sta) => (
                <option key={sta._id} value={sta._id}>
                  {sta.name}
                </option>
              ))}
          </select>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h6 className="text-lg font-semibold text-gray-800 mb-4">
              Paso 2: Servicios y precios
            </h6>
            {services.map((service, index) => (
              <div key={index} className="mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Nombre del servicio"
                  value={service.name_service}
                  onChange={(e) =>
                    handleServiceChange(index, "name_service", e.target.value)
                  }
                  required
                  className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Precio del servicio"
                  value={service.price}
                  onChange={(e) =>
                    handleServiceChange(index, "price", e.target.value)
                  }
                  required
                  className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-sm text-red-500 mt-2 hover:underline">
                    Eliminar
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addService}
              className="w-full mt-2 bg-green-500 text-xs font-semibold text-white rounded-lg py-2 text-gray-700 hover:bg-green-600 transition">
              Agregar Servicio
            </button>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Registrarse como proveedor
            </button>
          </div>
      </form>
    </div>
  </section>
);
}