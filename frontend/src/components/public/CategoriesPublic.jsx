export default function CategoriesPublic ({categories} ){

return (
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-4">
    {categories.map((cat) => (
      <div
        key={cat._id}
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition">
        <p className="text-base font-semibold text-gray-800 mb-1">
          {cat.name}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {cat.description}
        </p>
      </div>
    ))}
  </div>
);
}