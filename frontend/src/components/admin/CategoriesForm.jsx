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