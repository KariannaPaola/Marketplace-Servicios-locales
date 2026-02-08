import { Trash2, Pencil } from "lucide-react";

export default function CategoriesList ({categories, remove,editStart}){

return (
  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4 px-2">
    {categories.map((cat) => (
      <div
        key={cat._id}
        className="group bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 flex flex-col justify-between max-w-[260px] w-full mx-auto hover:shadow-md hover:border-gray-300 transition-all">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 leading-tight">
            {cat.name}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            {cat.description}
          </p>
        </div>
        <div className="flex justify-end gap-1.5 mt-3">
          <button
            onClick={() => editStart(cat)}
            title="Editar"
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition">
            <Pencil size={15} />
          </button>
          <button
            onClick={() => remove(cat._id)}
            title="Eliminar"
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition">
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    ))}
  </div>
);
}