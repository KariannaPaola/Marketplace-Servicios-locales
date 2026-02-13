import { useState, useEffect } from "react";
import { myFees } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useMyFeesProvider (){
const [fees, setFees] = useState([]);
const [feeApi, setFeeApi] = useState(null);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(true);
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

useEffect (()=>{
  try {
    axios.get("https://ve.dolarapi.com/v1/dolares/oficial")
    .then(resp => {
      setFeeApi(resp)})
    setLoading(false)
  } catch(error) {
    console.error(error);
  };

  },[])

  return{fees,page, setPage, total, limit, feeApi, loading}
}