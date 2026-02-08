export default function CategoriesPublic ({categories} ){

return (
  <div className="px-4 py-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
    {categories.map((cat) => (
      <div key={cat._id} className="w-full max-w-[180px] aspect-square bg-white border border-gray-400 rounded-xl p-3 shadow-lg flex flex-col justify-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
        <p className="text-sm font-bold text-center leading-tight mb-1 text-gray-600 ">
          {cat.name}
        </p>
        <p className="text-[11px] text-gray-600 text-center leading-snug line-clamp-3">
          {cat.description}
        </p>
      </div>
    ))}
  </div>
);
}