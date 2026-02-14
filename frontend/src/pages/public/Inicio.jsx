import CategoriesPublic from "../../components/public/CategoriesPublic";
import FeatureHighlights from "../../components/public/FeatureHighlights";
import UseCategoriesPublic from "../../hooks/public/useCategoriesPublic";
import GetProvidersPublic from "../../components/public/GetProvidersPublic";
import UseGetProvidersPublic from "../../hooks/public/useGetProvidersPublic";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { categoriesPublic, getStates } from "../../services/auth";
import imagen from "../../assets/Imagen.png"
import imagen2 from "../../assets/Imagen2.png"


export default function Home() {
const {categories}=UseCategoriesPublic()
const {providers}=UseGetProvidersPublic()

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

    navigate(`/searchPublic?${params.toString()}`);
  };

  if (loading) return <p>cargando...</p>

  return( 
  <div>
    <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
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
              className="w-full  text-xs rounded-lg bg-white py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todas las categorías</option>
              {categories_.categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-lg text-xs bg-white py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todas las ubicaciones</option>
              {states.states.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </section>
  
    <GetProvidersPublic
      providers={providers}
    />

    <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl text-white md:text-5xl font-extrabold leading-tight mb-6">
          Conecta con profesionales confiables<br />
          <span className="text-green-600">en minutos</span>
        </h1>
        <p className="text-lg text-indigo-100 mb-8">
          Encuentra expertos verificados o ofrece tus servicios en un marketplace
          seguro, transparente y diseñado para crecer contigo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className=" text-white border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
          onClick={() => navigate(`/login`)}>
            Quiero ofrecer mis servicios
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={imagen}
          alt="Marketplace de servicios"
          className="w-full"
        />
      </div>
    </div>
      
    <CategoriesPublic
      categories={categories}
    />
    <section className="py-20">
      <div className="max-w-7xl p-6  mx-auto px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-16">
          ¿Cómo funciona?
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            "Regístrate gratis",
            "Explora o publica servicios",
            "Solicita o acepta trabajos",
            "Califica y construye reputación"
          ].map((step, i) => (
            <div key={i}>
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-700 text-white font-bold text-lg">
                {i + 1}
              </div>
              <p className="font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-green-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            ¿Eres profesional o prestador de servicios?
          </h2>
          <p className="text-indigo-100 mb-6">
            Publica tu perfil, recibe solicitudes reales y construye tu reputación
            sin intermediarios abusivos.
          </p>
          <ul className="space-y-3 mb-8">
            <li>✔ Perfil visible solo si cumples las reglas</li>
            <li>✔ Control total de tus servicios y tarifas</li>
            <li>✔ Sistema de reputación transparente</li>
          </ul>
        </div>
        <div className="hidden md:block">
          <img src={imagen2} alt="Prestadores" />
        </div>
      </div>
    </section>
    <FeatureHighlights/>
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Empieza hoy mismo
      </h2>
      <p className="text-gray-300 mb-8">
        Registrarse es gratis. Encuentra servicios o empieza a ofrecer los tuyos.
      </p>
      <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition"   
      onClick={() => navigate(`/login`)}>
        Crear cuenta gratis
      </button>
    </section>
  </div>
)
}