import { useState, useEffect } from "react";
import { fetchFeesAdmin, approveFee, disapproveFee } from "../../services/auth";

export default function useFeesAdmin(){
const [fees, setFees] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const limit = 10

useEffect (()=>{
  const getFeesAdmin= async()=>{
    try {
      const data= await fetchFeesAdmin({page, limit});
      setFees(data.fees);
      setTotal(data.total)
    } catch (error) {
      console.log (error, "Error al mostrar tarifas")
    }
}
  getFeesAdmin()
},[page])


const approve= async(feeId)=>{
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
const reject= async(feeId)=>{
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


return{
fees, setFees,page, setPage , limit, total, setTotal, approve, reject}
}