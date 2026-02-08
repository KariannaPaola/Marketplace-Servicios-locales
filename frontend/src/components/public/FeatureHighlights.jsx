import { CheckCircle, ShieldCheck, Zap } from "lucide-react";

export default function FeatureHighlights() {
 return (
  <section className="w-full flex justify-center py-8">
   <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
    <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
     <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
     <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Profesionales verificados
     </h3>
     <p className="text-sm text-gray-600 leading-relaxed">
      Todos los proveedores de servicios son examinados y verificados para
      garantizar la calidad.
     </p>
    </div>
    <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
     <ShieldCheck className="w-12 h-12 text-green-500 mb-4" />
     <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Pagos seguros
     </h3>
     <p className="text-sm text-gray-600 leading-relaxed">
      Sus pagos están protegidos mediante sistemas de verificación y
      seguridad de nivel profesional.
     </p>
    </div>
    <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
     <Zap className="w-12 h-12 text-green-500 mb-4" />
     <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Respuestas rápidas
     </h3>
     <p className="text-sm text-gray-600 leading-relaxed">
      Obtenga respuestas de los proveedores en minutos, no en horas.
     </p>
    </div>
   </div>
  </section>
 );
}