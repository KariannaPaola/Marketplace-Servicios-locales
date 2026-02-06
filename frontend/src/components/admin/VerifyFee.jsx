
export default function VerifyFee({fee, approve, reject}){

return (

<div>
    <h1>Verificar referencia</h1>
    
    {!fee && <p>Cargando tarifa...</p>}

    {fee && fee.status==="pagado" &&(
      <>
        <p>Referencia: {fee.payment_reference}</p>
        <button onClick={() => approve(fee._id)}>
          Aprobar
        </button>
        <button onClick={() => reject(fee._id)}>
          Rechazar
        </button>
      </>
    )}
    {fee && fee.status==="aprobado" && (
      <p>pago aprobado con exito</p>
    )}
    {fee && fee.status==="rechazado" && (
      <p>pago rechazado con exito</p>
    )}
  </div>

)
}