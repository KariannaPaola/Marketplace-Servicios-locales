import { Trash2, Pencil } from "lucide-react";

export default function CategoriesList ({categories, remove,editStart}){

return (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ml-2 mr-2">
    {categories.map((cat) => (
      <div
        key={cat._id}
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-1">
            {cat.name}
          </h4>
          <p className="text-xs text-gray-600">
            {cat.description}
          </p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => editStart(cat)}
            className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition"
            title="Editar">
            <Pencil size={18} />
          </button>
          <button
            onClick={() => remove(cat._id)}
            className="p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            title="Eliminar">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      ))}
    </div>
  );
}