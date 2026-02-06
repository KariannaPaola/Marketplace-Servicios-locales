export default function PayMyFeeProvider ({payMyFee, reference, setreference} ){

return(
<div>
    <h1>Pago de tarifa</h1>
    <form onSubmit={payMyFee}>
      <input
        type="text"
        placeholder="Ingresa el numero de referencia "
        value={reference}
        onChange={(e) => setreference(e.target.value)}
        required
      />
      <button type="submit">Enviar referencia</button>
    </form>
  </div>
)
}