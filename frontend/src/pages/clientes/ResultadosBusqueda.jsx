import React from "react";
import { useState, useEffect } from "react";
import { getProviders } from "../../services/auth";
import { useNavigate } from "react-router-dom";


export default function GetProvidersSearch (){
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();
  
  useEffect ( () => {
    const getProvider= async()=>{
      try {
        const data= await getProviders();
        setProviders(data.providers)
      } catch (error) {
        console.log (error, "Error al obtener provedores")
        }
      }
    getProvider ()
  },[])

console.log(providers)

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
    <button onClick={() => navigate(`/Chat/${provider.user_Id._id}`)}>Empezar a cotizar</button>
    </div>
    )
    ) }


  </div>
)
}


