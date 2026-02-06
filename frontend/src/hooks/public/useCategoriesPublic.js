import React, { useState, useEffect } from "react";
import { categoriesPublic } from "../../services/auth";


export default function UseCategoriesPublic() {
  const [categories, setCategories] = useState([]);

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


  return {categories}
}