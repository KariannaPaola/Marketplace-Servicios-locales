import { useState, useEffect } from "react";
import { listAllFees, approveFee, disapproveFee } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function ListAllFees(){
const [fees, setFees] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const navigate=useNavigate();
const limit = 10

useEffect (()=>{
  const handleGetFees= async()=>{
    try {
      const data= await listAllFees({page, limit});
      setFees(data.fees);
      setTotal(data.total)
    } catch (error) {
      console.log (error, "Error al mostrar tarifas")
    }
}
  handleGetFees()
},[page])


const handleApproveFee= async(feeId)=>{
  try {
    await approveFee(feeId)
    setFees(prev =>
        prev.map(p =>
        p._id === feeId
        ? { ...p, status: "aprobado" }
        : p
        )
      );
  } catch (error) {
    console.log (error, "Error al aprobar tarifa")  
  }
}
const handleRejectRequest= async(feeId)=>{
  try {
    await disapproveFee(feeId)
    setFees(prev =>
        prev.map(p =>
        p._id === feeId
        ? { ...p, status: "rechazado" }
        : p
        )
      );
  } catch (error) {
    console.log (error, "Error al rechazar solicitud")  
  }
}

return (

<div >
  <h1>Gestion de pagos</h1>
  {console.log(fees)}
  {fees.map((fee)=>
  <div key={fee._id}>
  {fee.status === "pendiente" && <div>
    <p>pago pendiente</p>
    </div>}
    {fee.status === "pagado" && <div>
    <p>revisar referencia de pago</p>
    <button onClick={() => navigate(`/admin/fee/${fee._id}`)}>
      Revisar pago y referencia enviada
    </button>
    <button onClick={()=>handleApproveFee(fee._id)}>
      aprobar
    </button>
    <button onClick={()=>handleRejectRequest(fee._id)}>
      rechazar
    </button>
    </div>}
    {fee.status === "rechazado" && <div>
    <p>pago rechazado</p>
    </div>}
    {fee.status === "aprobado" && <div>
    <p>pago aprobado</p>
    </div>}
  </div>
  )}
  <div>
  </div>
   <div>
    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Anterior</button>
    <button disabled={page * limit >= total}  onClick={()=>setPage(p => p + 1)}>Siguiente</button>
   </div>
    
</div>

)
}