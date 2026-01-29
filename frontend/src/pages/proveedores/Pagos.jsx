import { useState, useEffect } from "react";
import { myFees } from "../../services/auth";

export default function MyFees(){
const [fees, setFees] = useState([]);

useEffect (()=>{
  const handleGetFees= async()=>{
    try {
      const data= await myFees();
      setFees(data.fees)
      console.log(fees)
    } catch (error) {
      console.log (error, "Error al mostrar tarifas")
    }
}
handleGetFees()
},[])

return (

<div >
  <h1>Historial de pagos y tarifas</h1>
  {console.log(fees)}
  {fees.map((fee)=>
  <div key={fee._id}>
  {fee.status === "pendiente" && <div>
    <p>pago pendiente</p>
    <button>
      entra para pagar tu tarifa
    </button>
    </div>}
  {fee.status === "pagado" && <div>
    <p>pago pendiente por aprobar</p>
    </div>}
    {fee.status === "rechazado" && <div>
    <p>pago rechazado</p>
    <button>
      enviar referencia de nuevo
    </button>
    </div>}
    {fee.status === "aprobado" && <div>
    <p>Su pago fue aprobado</p>
    </div>}
  </div>
  )}
</div>

)
}