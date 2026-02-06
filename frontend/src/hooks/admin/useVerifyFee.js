import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { verifyfee, approveFee, disapproveFee } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function useVerifyFeeAdmin(){
  const [fee, setFee] = useState(null);
  const {id}= useParams();
  const navigate = useNavigate()

  useEffect (()=>{
    const getReferenceAdmi= async(id)=>{
      try {
        const data= await verifyfee(id);
        setFee(data.fee)
      } catch (error) {
        console.log (error, "Error al mostrar tarifa y referencia")
      }
  }
  getReferenceAdmi(id)
  },[id])

  const approve= async(feeId)=>{
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
  const reject= async(feeId)=>{
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
  
  return {fee, approve, reject}
}
