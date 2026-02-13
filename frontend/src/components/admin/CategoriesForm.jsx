/**
 * CategoryForm
 * ------------------------------------------------------------
 * Componente de formulario para la gestión de categorías.
 * Permite crear y editar categorías de servicios mediante
 * un formulario controlado.
 *
 * Props:
 * @param {string} name - Nombre actual de la categoría.
 * @param {Function} setName - Setter para actualizar el nombre de la categoría.
 *
 * @param {string} description - Descripción actual de la categoría.
 * @param {Function} setDescription - Setter para actualizar la descripción.
 *
 * @param {boolean} creatingCategory - Indica si la categoría se está creando (estado de carga).
 *
 * @param {Object|null} editingCategory - Categoría en edición o null si se está creando una nueva.
 * @param {Function} setEditingCategory - Setter para definir o limpiar la categoría en edición.
 *
 * @param {Function} edit - Función que se ejecuta al enviar el formulario en modo edición.
 * @param {Function} create - Función que se ejecuta al enviar el formulario en modo creación.
 *
 * Comportamiento:
 * - Si `editingCategory` existe, el formulario entra en modo edición.
 * - Si no existe, el formulario crea una nueva categoría.
 * - El botón "Cancelar" limpia el estado y sale del modo edición.
 *
 * Dependencias externas:
 * - lucide-react (íconos Save y X)
 */

import { Save, X } from "lucide-react";

export default function CategoryForm({name, setName,description, setDescription, creatingCategory, editingCategory, setEditingCategory, edit, create}){

return (
  <div className="max-w-md mx-auto mb-10 mt-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
    <div className="flex flex-col items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Gestión de categorías
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Administrar categorías de servicios
      </p>
    </div>
    <h3 className="text-sm font-semibold text-gray-700 mb-5">
      {editingCategory ? "Editar categoría" : "Crear categoría"}
    </h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editingCategory ? edit() : create();
      }}
      className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Nombre
        </label>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500transition"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Descripción
        </label>
        <input
          type="text"
          placeholder="Descripción de la categoría"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500transition"
        />
      </div>
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={creatingCategory}
          className="flex items-center gap-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          <Save size={18} />
          {editingCategory ? "Actualizar" : "Agregar categoría"}
        </button>
        {editingCategory && (
          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setName("");
              setDescription("");
            }}
            className="flex items-center gap-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg transition-all">
            <X size={18}/>
            Cancelar
          </button>
        )}
      </div>
    </form>
  </div>
);
}