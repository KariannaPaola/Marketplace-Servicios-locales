import CategoriesPublic from "../../components/public/CategoriesPublic";
import ProvidersPublic from "../../components/public/ProvidersPublic";
import UseCategoriesPublic from "../../hooks/public/useCategoriesPublic";
import UseProvidersPublic from "../../hooks/public/useProvidersPublic";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStates, categoriesPublic } from "../../services/auth";

export default function HomeClientPage() {
const {categories}= UseCategoriesPublic();
const {providers}= UseProvidersPublic();
const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [categories_, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      setCategories(await categoriesPublic());
      setStates(await getStates());
      setLoading(false)
    };
    loadFilters();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (state) params.append("state", state);

    navigate(`/search?${params.toString()}`);
  };

  if (loading) return <p>cargando...</p>
return(

<div>
 <div className="w-full bg-gray-950 px-6 py-16">
  <div className="mx-auto max-w-4xl text-center">
    {/* Título y subtítulo */}
    <h1 className="mb-4 text-4xl font-bold text-white">
      Encuentre proveedores de servicios confiables para cualquier trabajo
    </h1>
    <h5 className="mb-8 text-lg text-white">
      Conéctate con profesionales verificados de tu zona. Desde reparaciones del hogar
      hasta clases, encuentra al experto ideal para tus necesidades
    </h5>

    {/* Search box con selects y botón */}
    <div className="search-box relative mx-auto mb-8 w-full max-w-md flex flex-col sm:flex-row gap-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full  text-xs rounded-lg bg-white py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todas las categorías</option>
        {categories_.categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-full rounded-lg text-xs bg-white py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Todas las ubicaciones</option>
        {states.states.map((s) => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="w-full sm:w-auto rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  </div>
</div>
  <ProvidersPublic
    providers={providers} 
  />
  <CategoriesPublic
    categories={categories}
  />
</div>

)
}
