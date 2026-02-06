import { Save, X } from "lucide-react";

export default function CategoryForm({name, setName,description, setDescription, creatingCategory, editingCategory, setEditingCategory, edit, create}){

return (
  <div className="max-w-md mx-auto mb-8 mt-2 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Gestión de categorías
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Administrar categorías de servicios
      </p>
    </div>
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        {editingCategory ? "Editar categoría" : "Crear categoría"}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingCategory ? edit() : create();
        }}
        className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full text-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full text-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={creatingCategory}
            className="flex items-center gap-2 text-xs bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition disabled:opacity-50">
            <Save size={18} />
            {editingCategory ? "Actualizar" : "Agregar categoria"}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setName("");
                setDescription("");
              }}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition">
              <X size={18}/>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}