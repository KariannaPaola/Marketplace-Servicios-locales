import React, { useState, useEffect } from "react";
import { fetchcategoriesAdmin, createCategory, editCategory, deleteCategory} from "../../services/auth";


export default function useCategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const getCategoriesAdmin =  async () => {
      try {
        const data = await fetchcategoriesAdmin();
        setCategories(data.categories)
      } catch (error) {
        console.error("Error cargando categorías", error);
      } finally{
        setLoadingCategories (false)
      }
    }
    getCategoriesAdmin()
  }, []);

  const create = async () => {
    setCreatingCategory(true);
    try {
      const data = await createCategory( name, description );
      setCategories(prev => [...prev, data.category]);
      resetForm();
    } catch (error) {
      console.error("Error creando categoría", error);
    } finally {
      setCreatingCategory(false);
    }
  };

    const edit = async () => {
    if (!editingCategory) return;
    try {
      const data = await editCategory( editingCategory._id, {name,description,});
      setCategories(prev => prev.map(cat =>cat._id === editingCategory._id ? data.category : cat
      ));
      setEditingCategory(null);
      resetForm();
    } catch (error) {
      console.error("Error creando categoría", error);
    } 
  };

  const remove = async (categoria_id) => {
    try {
      await deleteCategory(categoria_id);
      setCategories(prev => prev.filter(cat => cat._id !== categoria_id));
    } catch (error) {
      console.error("Error eliminando categoría", error);
    } 
  };

  const editStart = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || "");
  };

  const resetForm = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  return{ name, setName,description, categories, setDescription, loadingCategories, create, creatingCategory, editingCategory, setEditingCategory, edit, remove, editStart}
}