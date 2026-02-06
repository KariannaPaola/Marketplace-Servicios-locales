import React from "react";
import { useState, useEffect } from "react";
import { fetchProvidersAdmin, approveProvider, disapproveProvider } from "../../services/auth";


export default function useProvidersAdmin (){
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setloading] = useState(true);
  const limit=10;

  
  useEffect ( () => {
    const getProvidersAdmin= async()=>{
      try {
        const data= await fetchProvidersAdmin({page, limit});
        setTotal(data.total)
        setProviders(data.providers)
        setloading(data.providers)
      } catch (error) {
        console.log (error, "Error al obtener provedores")
        }
      }
    getProvidersAdmin ()
  },[page])
  
  const approve= async (providerId)=>{
    try {
      await approveProvider(providerId);
      setProviders(prev =>
        prev.map(p =>
        p._id === providerId
        ? { ...p, status: "approved", profile_visible: true}
        : p
        )
      );
    } catch (error) {
      console.log("Error al aprobar proveedor")
    }
  }

  const rejected= async (providerId)=>{
    try {
      await disapproveProvider(providerId);
      setProviders(prev =>
        prev.map(p =>
        p._id === providerId
        ? { ...p, status: "rejected",  profile_visible: false  }
        : p
        )
      );
    } catch (error) {
      console.log("Error al desaprobar proveedor")
    }
  }

  return {providers, setProviders,page, setPage, total, setTotal, limit, approve, rejected, loading}
}