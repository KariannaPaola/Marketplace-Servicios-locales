import { useState, useEffect } from "react";
import { getRequestProvider } from "../../services/auth";
import { cancelRequest, confirmRequest } from "../../services/auth";

export default function useMyRequestsProvider (){
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit=10;

  useEffect (()=>{
    const getRequest= async()=>{
      try {
        const data= await getRequestProvider({page, limit});
        setRequests(data.requests)
        setTotal(data.total)
      } catch (error) {
        console.log (error, "Error al mostrar solicitudes")
      }
    }
  getRequest()
  },[page])

  const cancel= async(requestId)=>{
    try {
      await cancelRequest(requestId)
      setRequests(prev => prev.map(p => p._id === requestId ? { ...p, status: "cancelado" }: p));
    } catch (error) {
      console.log (error, "Error al cancelar solicitud")  
    }
  } 
  const confirm= async(requestId)=>{
    try {
      await confirmRequest(requestId)
      setRequests(prev =>prev.map(p =>p._id === requestId? { ...p, status: "completado" }: p));
    } catch (error) {
      console.log (error, "Error al cancelar solicitud")  
    }
  }

  return{requests,confirm, cancel,page, setPage, total, limit}
}