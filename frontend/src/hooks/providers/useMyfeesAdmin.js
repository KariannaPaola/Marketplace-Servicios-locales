import { useState, useEffect } from "react";
import { myFees } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function useMyFeesProvider (){
const [fees, setFees] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const navigate= useNavigate();
const limit=1

useEffect (()=>{
  const getMyFees= async()=>{
    try {
      const data= await myFees({page, limit});
      setFees(data.fees)
      setTotal(data.total)
    } catch (error) {
      console.log (error, "Error al mostrar tarifas")
    }
}
getMyFees()
},[page])


  return{fees,page, setPage, total, limit}
}