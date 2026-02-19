import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProviders } from "../../services/auth";
import { createChat } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function ProviderSearchFilterPublic() {
  const [searchParams] = useSearchParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category");
  const state = searchParams.get("state");
  const navigate=useNavigate()

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const categoryParam =
      typeof category === "string" && category !== "" ? category : undefined;

      const stateParam =
      typeof state === "string" && state !== "" ? state : undefined;

      const data = await getProviders({
      page: 1,
      limit: 10,
      ...(categoryParam && { category: categoryParam }),
      ...(stateParam && { state: stateParam }),
    });

      setProviders(data.providers);
      console.log(providers)
      setLoading(false);
    };

    fetchResults();
  }, [category, state]);

  useEffect(() => {
  console.log("Providers actualizados:", providers);
}, [providers]);

return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-10">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Resultados
      </h1>

      {loading && (
        <p className="text-gray-600 animate-pulse">
          Cargando resultados...
        </p>
      )}

      {!loading && providers.length === 0 && (
        <p className="text-gray-500 text-lg">
          No se encontraron prestadores
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col justify-between">
           
            <div>
             
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {p.profession}
              </h3>
              <h5 className="text-ms font-semibold text-gray-800 mb-2">
                {p.user_Id.name} {p.user_Id.lastname}
              </h5>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {p.description}
              </p>

              <div className="text-xs text-gray-500 mb-6">
                <span className="font-medium">
                  {p.categories?.name}
                </span>
                {" — "}
                <span>{p.state?.name}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <button
                onClick={() =>
                  navigate(`/profileProviderPublic/${p.user_Id._id}`)
                }
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
              >
                Ver perfil completo y tarifas
              </button>

              <button
                onClick={async () => {
                  try {
                     await createChat(p.user_Id._id);
                    navigate(`/login`);
                  } catch (error) {
                    console.error("Error al crear chat:", error);
                  }
                }}
                className="w-full bg-gray-900 hover:bg-black text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
              >
                Empezar a cotizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}