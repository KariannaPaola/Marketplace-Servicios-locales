export default function SuccessfulChangePassword(){

return(
  <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center flex flex-col gap-4">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">
        Contraseña cambiada
      </h2>
      <p className="text-sm text-gray-500">
        Contraseña cambiada exitosamente. Ya puedes inciar sesión
      </p>
    </div>
</div>

)
}