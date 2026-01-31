import { useState, useEffect } from "react";
import { myFees } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function MyFees(){
const [fees, setFees] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const navigate= useNavigate();
const limit=1

useEffect (()=>{
  const handleGetFees= async()=>{
    try {
      const data= await myFees({page, limit});
      setFees(data.fees)
      setTotal(data.total)
    } catch (error) {
      console.log (error, "Error al mostrar tarifas")
    }
}
handleGetFees()
},[page])

return (

<div >
  <h1>Historial de pagos y tarifas</h1>
  {console.log(fees)}
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