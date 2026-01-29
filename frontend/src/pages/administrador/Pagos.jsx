import { useState, useEffect } from "react";
import { listAllFees, approveFee, disapproveFee } from "../../services/auth";

export default function ListAllFees(){
const [fees, setFees] = useState([]);

useEffect (()=>{
  const handleGetFees= async()=>{
    try {
      const data= await listAllFees();
      setFees(data.fees)
      console.log(fees)
    } catch (error) {
      console.log (error, "Error al mostrar tarifas")
    }
}
 handleGetFees()
},[])


const handleApproveFee= async(feeId)=>{
  try {
    await approveFee(feeId)
    setRequests(prev =>
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
    setRequests(prev =>
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
    <button>
      Verificar pago
    </button>
    <button  onClick={()=>handleApproveFee(fee._id)}>
      aprobar
    </button>
    <button  onClick={()=>handleRejectRequest(fee._id)}>
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
</div>

)
}