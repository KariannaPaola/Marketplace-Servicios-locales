import React from "react";
import { useState, useEffect } from "react";
import { getProvidersAdmin, approveProvider, disapproveProvider } from "../../services/auth";


export default function GetProvidersAdmin (){
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit=10;

  
  useEffect ( () => {
    const handleGetProviderAdmin= async()=>{
      try {
        const data= await getProvidersAdmin({page, limit});
        setTotal(data.total)
        setProviders(data.providers)
      } catch (error) {
        console.log (error, "Error al obtener provedores")
        }
      }
    handleGetProviderAdmin ()
  },[page])
  
  const handleApproveProvider= async (providerId)=>{
    try {
      await approveProvider(providerId);
      setProviders(prev =>
        prev.map(p =>
        p._id === providerId
        ? { ...p, status: "approved" }
        : p
        )
      );
    } catch (error) {
      console.log("Error al aprobar proveedor")
    }
  }

  const handleDisapproveProvider= async (providerId)=>{
    try {
      await disapproveProvider(providerId);
      setProviders(prev =>
        prev.map(p =>
        p._id === providerId
        ? { ...p, status: "rejected" }
        : p
        )
      );
    } catch (error) {
      console.log("Error al desaprobar proveedor")
    }
  }

return(
  <div>
<h1>Gestion de provedores</h1>

    <p>holi</p>
    {providers.map((provider)=> (
    <div key={provider._id}>
      <p>{provider.description}</p>
      <p>{provider.user_Id.name}</p>
      <p>{provider.user_Id.lastname}</p>
      {provider.status === "approved" && <p>Aprobado</p>}
      {provider.status === "rejected" && <p>Rechazado</p>}
      {provider.status === "pending" && (
      <div>
        <button onClick={() => handleApproveProvider(provider._id)}>
          Aprobar
        </button>
        <button onClick={() => handleDisapproveProvider(provider._id)}>
          Rechazar
        </button>
      </div>)}
    </div>)) }
    <div>
      <button disabled={page===1}  onClick={()=>setPage(p=> p - 1)} >Anterior</button>
      <button disabled={page * limit >= total} onClick={()=>setPage(p=> p + 1)}>Siguiente</button>
    </div>
  </div>
)
}