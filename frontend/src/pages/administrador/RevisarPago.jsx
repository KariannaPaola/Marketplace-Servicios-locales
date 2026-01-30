import { useState, useEffect } from "react";
import { verifyfee } from "../../services/auth";
import { useParams } from "react-router-dom";
import { approveFee, disapproveFee } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyFee(){
const [fee, setFee] = useState(null);
const {id}= useParams();
const navigate = useNavigate()

useEffect (()=>{
  const handleGetReference= async(id)=>{
    try {
      const data= await verifyfee(id);
      setFee(data.fee)
    } catch (error) {
      console.log (error, "Error al mostrar tarifa y referencia")
    }
}
handleGetReference(id)
},[id])

const handleApproveFee= async(feeId)=>{
  try {
    const data=await approveFee(feeId); 
    setFee(data.fee)
    setTimeout(() => {
      navigate("/admin/fees");
    }, 1500);
  } catch (error) {
    console.log (error, "Error al aprobar tarifa")  
  }
}
const handleRejectRequest= async(feeId)=>{
  try {
    const data= await disapproveFee(feeId)
    setFee(data.fee)
    setTimeout(() => {
      navigate("/admin/fees");
    }, 1500); 
  } catch (error) {
    console.log (error, "Error al rechazar solicitud")  
  }
}

return (

<div>
    <h1>Verificar referencia</h1>
    
    {!fee && <p>Cargando tarifa...</p>}

    {fee && fee.status==="pagado" &&(
      <>
        <p>Referencia: {fee.payment_reference}</p>
        <button onClick={() => handleApproveFee(fee._id)}>
          Aprobar
        </button>
        <button onClick={() => handleRejectRequest(fee._id)}>
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