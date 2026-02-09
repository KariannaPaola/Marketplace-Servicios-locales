export default function PayMyFeeProvider ({payMyFee, reference, setreference, error} ){
  const onSubmit = async (e) => {
    e.preventDefault();
    await payMyFee();
  };

return (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <h1 className="text-2xl font-bold text-center mb-4">
        Detalles de pago
      </h1>
      <p className="text-gray-600 text-sm mb-4 text-center">
        Por favor realice el pago del monto establecido a los siguientes datos:
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-5 text-sm">
        <p>
          <span className="font-semibold">Banco:</span> Banca Amiga
        </p>
        <p>
          <span className="font-semibold">Cédula:</span> 26123456
        </p>
        <p>
          <span className="font-semibold">Teléfono:</span> 0414341785
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ingresa el número de referencia completo"
          value={reference}
          onChange={(e) => setreference(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors">
          Enviar referencia
        </button>
      </form>
    </div>
  </div>
);
}