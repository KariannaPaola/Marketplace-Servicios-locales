import React, { useState, useEffect } from "react";
import { getProviders} from "../../services/auth";


export default function UseProvidersPublic() {
  const [providers, setProviders] = useState([]);
  
  useEffect(() => {
    const fetchProviders =  async () => {
      try {
        const data = await getProviders();
        setProviders(data.providers)
      } catch (error) {
          console.error("Error cargando provedores", error);
      } 
    }
    fetchProviders()
  }, []); 

  return {providers}
}