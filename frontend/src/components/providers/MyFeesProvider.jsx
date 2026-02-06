export default function MyFeesProvider ({fees,page, setPage, total, limit} ){

return(
<div >
  <h1>Historial de pagos y tarifas</h1>
  {fees.map((fee)=>
  <div key={fee._id}>
  {fee.status === "pendiente" && <div>
    <p>pago pendiente</p>
    <button onClick={()=>navigate(`/provider/payfee/${fee._id}`) }>
      entra para pagar tu tarifa
    </button>
    </div>}
  {fee.status === "pagado" && <div>
    <p>pago pendiente por aprobar</p>
    </div>}
    {fee.status === "rechazado" && <div>
    <p>pago rechazado</p>
    <button onClick={()=>navigate(`/provider/payfee/${fee._id}`) }>
      enviar referencia de nuevo
    </button>
    </div>}
    {fee.status === "aprobado" && <div>
    <p>Su pago fue aprobado</p>
    </div>}
  </div>
  )}

  <div>
    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Anterior</button>
    <button disabled={page * limit >= total}  onClick={()=>setPage(p => p + 1)}>Siguiente</button>
   </div>
</div>

)
}