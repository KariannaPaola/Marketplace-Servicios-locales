import React, { useState, useEffect } from "react";
import { getProfileProvider } from "../../services/auth";
import { useParams } from "react-router-dom";

export default function ProfileProvider(){
const { id } = useParams();
const [profileProvider, setProfileProvider]= useState({})

useEffect (()=>{
  const getProfile = async ()=>{
    try {
      const data= await getProfileProvider(id);
      setProfileProvider(data)
      console.log (data)

    } catch (error) {
      console.log("Error al obtener perfil del proveedor", error)
    }


  } 

getProfile ()

}),[]

return(
 <div>
  <p>{profileProvider.profession}</p>

 </div>

)

}

