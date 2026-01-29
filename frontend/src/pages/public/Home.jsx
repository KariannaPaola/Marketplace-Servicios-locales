import React, { useState, useEffect } from "react";
import { categoriesPublic,  getProviders} from "../../services/auth";



export default function Home() {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchCategories =  async () => {
        try {
          const data = await categoriesPublic(); 
          setCategories(data.categories)
        } catch (error) {
          console.error("Error cargando categorías", error);
        } 
      }
      fetchCategories()
  }, []);

  
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

  return( 
  <div>
    {categories.map((cat) => (
    <div key={cat._id}>
      {cat.name}
    </div> ))}

    {providers.map((provider) => (
    <div key={provider._id}>
      <h3>{provider.profession}</h3>
      <p>{provider.description}</p>
      <p>Profesional: {provider.user_Id?.name} {provider.user_Id?.lastname}</p>
      <p>Categoría: {provider.categories?.name}</p>
      <p>Estado: {provider.state?.name}</p>
      <p>Rating: {provider.rating}</p>
      {provider.membership_premium && (
      <strong>Usuario Premium</strong>)}
    </div>))}
  </div>
  )
}