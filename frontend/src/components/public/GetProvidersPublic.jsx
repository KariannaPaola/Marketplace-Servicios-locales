import { useNavigate } from "react-router-dom"
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";

export default function GetProvidersPublic ({providers} ){
  const navigate = useNavigate()
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();

  return (
  <div className="relative max-w-[91vw] flex items-center">
    <button
      onClick={scrollLeft}
      className="absolute left-3 z-10 bg-white/90 backdrop-blur shadow-xl rounded-full p-3 hover:scale-105 transition-all">
      ❮
    </button>
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto scroll-smooth px-14 py-6 scrollbar-hide"
      >
        
      {providers.map((provider) => (
        <div key={provider._id} className="min-w-[320px] max-w-[320px] h-[340px] bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-gray-900">
                {provider.user_Id?.name} {provider.user_Id?.lastname}
              </p>
              <p className="text-sm text-green-600 font-medium">
                {provider.profession}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 fill-green-500"
                  viewBox="0 0 24 24">
                  <path d="M12 2l2.9 6.6L22 9.3l-5 4.8L18.2 22 12 18.6 5.8 22 7 14.1 2 9.3l7.1-0.7L12 2z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  {provider.rating}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {provider.state?.name}
              </p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">
              {provider.description}
            </p>
          </div>
          <button
            onClick={() =>
              navigate(`/login`)
            }
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg">
            Ver perfil completo y tarifas
          </button>
        </div>
      ))}
    </div>
    <button
      onClick={scrollRight}
      className="absolute right-3 z-10 bg-white/90 backdrop-blur shadow-xl rounded-full p-3 hover:scale-105 transition-all">
      ❯
    </button>
  </div>
);
}