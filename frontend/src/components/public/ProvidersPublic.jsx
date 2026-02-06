import { useNavigate } from "react-router-dom"
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";

export default function ProvidersPublic ({providers} ){
  const navigate = useNavigate()
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();

  return (
    <div className="relative w-full flex items-center">
      <button
        onClick={scrollLeft}
        className="absolute left-2 z-10 bg-white shadow-2xl rounded-full p-2 hover:bg-gray-100">
        ❮
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-4">
        {providers.map((provider) => (
          <div key={provider._id} className="min-w-[300px] max-w-[300px] h-[300px]  bg-gray-200 rounded-xl shadow-lg p-4 flex flex-col gap-3 justify-between">
            <div className=" flex-4 bg-gray-100">foto</div>
            <div className="flex-2 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-800">{provider.user_Id?.name} {provider.user_Id?.lastname}</p>
                <p className="text-xs text-gray-500">{provider.profession}</p>
              </div>
              <div className="flex gap-6">
                <p className="text-sm text-gray-600">
                  {provider.rating}
                </p>
                <p className="text-sm text-gray-600">
                  {provider.state?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500  mt-2overflow-hidden[display:-webkit-box][-webkit-line-clamp:3][-webkit-box-orient:vertical]">
                  {provider.description}
                </p>
              </div>
            </div>
            <div className="flex-2">
              <button
              onClick={() => navigate(`/profileProvider/${provider.user_Id._id}`)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Ver perfil completo y tarifas
            </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100">
        ❯
      </button>
    </div>
  );
}