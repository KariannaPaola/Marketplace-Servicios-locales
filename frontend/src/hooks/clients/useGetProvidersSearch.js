import React from "react";
import { useState, useEffect } from "react";
import { getProviders } from "../../services/auth";

export default function useGetProvidersSearchClient(){
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;
      
  useEffect ( () => {
    const getProvider= async()=>{
      try {
        const data= await getProviders({page, limit});
        setProviders(data.providers)
        setTotal(data.total);
      } catch (error) {
          console.log (error, "Error al obtener provedores")
      }finally{
        setLoading(false)
      }
    }
  getProvider ()
  },[page])

return{providers,page, setPage, total, limit,loading}
}