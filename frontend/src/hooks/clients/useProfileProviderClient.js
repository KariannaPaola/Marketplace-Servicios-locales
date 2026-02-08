import React, { useState, useEffect } from "react";
import { getProfileProvider } from "../../services/auth";
import { useParams } from "react-router-dom";


export default function useProfileProviderClient (){
  const { id } = useParams();
  const [profileProvider, setProfileProvider]= useState({})
console.log("🚀 funcion EJECUTADO");
  useEffect(() => {
  const getProfile = async () => {     
    try {
      console.log("🚀 USEEFFECT EJECUTADO");
      const data = await getProfileProvider(id);
      setProfileProvider(data);
    } catch (error) {
      console.log("Error al obtener perfil del proveedor", error);
    }
  };

  getProfile();
}, [id]); 

  return{profileProvider}
}