import React from "react";
import { useState, useEffect } from "react";
import { getProviders } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../services/auth";

export default function GetProvidersSearch (){
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;
  const navigate = useNavigate();
  
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


if (loading) return <p>Cargando</p>
return(
  <div>
    

    <p>holi</p>
    {providers.map((provider)=> (
    <div key={provider._id}>
      <p>{provider.description}</p>
      <p>{provider.user_Id.name}</p>
      <p>{provider.user_Id.lastname}</p>
      {provider.services_offered.map((ser)=> (
    <div key={ser._id}>
      <p>{ser.name_service}</p>
      <p>{ser.price}</p>

    </div>
    )
    ) }
    <button onClick={() => navigate(`/profileProvider/${provider.user_Id._id}`)}>Ver perfil completo y tarifas</button>
    <button
    onClick={async () => {
    try {
      {console.log(provider)}
      const data = await createChat(provider.user_Id._id); // manda providerI
      navigate(`/Chat/${data.chat._id}`);         
    } catch (error) {
      console.error("Error al crear chat:", error);
    }
    }}
    className="bg-green-500 text-white px-4 py-2 rounded"
    >
  Empezar a cotizar
  </button>
    
    </div>
    )
    ) }

    <div>
  <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
    Anterior 
  </button>

  <button
    disabled={page * limit >= total}
    onClick={() => setPage(p => p + 1)}
  >
    Siguiente
  </button>
</div>
  </div>
)
}


