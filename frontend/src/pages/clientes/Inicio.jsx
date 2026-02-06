import CategoriesPublic from "../../components/public/CategoriesPublic";
import ProvidersPublic from "../../components/public/ProvidersPublic";
import UseCategoriesPublic from "../../hooks/public/useCategoriesPublic";
import UseProvidersPublic from "../../hooks/public/useProvidersPublic";

export default function HomeClientPage() {
const {categories}= UseCategoriesPublic();
const {providers}= UseProvidersPublic();

return(

<div>
  <div className="w-full bg-blue-900 px-6 py-16">
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="mb-4 text-4xl font-bold text-white">
        Encuentre proveedores de servicios confiables para cualquier trabajo
      </h1>
      <h5 className="mb-8 text-lg text-white">
        Conéctate con profesionales verificados de tu zona. Desde reparaciones del hogar
        hasta clases, encuentra al experto ideal para tus necesidades
      </h5>
      <div className="relative mx-auto mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full rounded-lg bg-white py-3 pl-4 pr-28 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-1 top-1 bottom-1 rounded-md bg-blue-600 px-6 text-white hover:bg-blue-700">
          Buscar
        </button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
        <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
          Contratar un profesional
        </button>
        <button className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-blue-900">
          Empezar a ofrecer servicios
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
