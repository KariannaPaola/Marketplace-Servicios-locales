import React, { useState, useEffect } from "react";
import { getProvidersPublic } from "../../services/auth";


export default function UseGetProvidersPublic() {
  const [providers, setProviders] = useState([]);
  
  useEffect(() => {
   console.log("goood")
    const fetchProviders =  async () => {
      try {
        const data = await getProvidersPublic();
        setProviders(data.providers)
      } catch (error) {
          console.error("Error cargando provedores", error);
      } 
    }
    fetchProviders()
  }, []); 

  return {providers}
}