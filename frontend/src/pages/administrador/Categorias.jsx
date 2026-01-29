import React, { useState, useEffect } from "react";
import { categoriesAdmin, createCategory, editCategory, deleteCategory} from "../../services/auth";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const fetchCategories =  async () => {
      try {
        const data = await categoriesAdmin();
        setCategories(data.categories)
      } catch (error) {
        console.error("Error cargando categorías", error);
      } finally{
        setLoadingCategories (false)
      }
    }
    fetchCategories()
  }, []);


  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setCreatingCategory(true);
    try {
      const data = await createCategory( name, description );
      setCategories(prev => [...prev, data.category]);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creando categoría", error);
    } finally {
      setCreatingCategory(false);
    }
  };


  const handleEditClick = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || "");
  };

  const handleEditCategory = async (e) => {
    e.preventDefault(); 
    if (!editingCategory) return;
    try {
      const data = await editCategory( editingCategory._id, {name,description,});
      setCategories(prev => prev.map(cat =>cat._id === editingCategory._id ? data.category : cat
      ));
      setEditingCategory(null);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creando categoría", error);
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoria_id) => {
    try {
      const data = await deleteCategory(categoria_id);
      setCategories(prev => prev.filter(cat => cat._id !== categoria_id));
    } catch (error) {
      console.error("Error eliminando categoría", error);
    } 
  };

  if (loadingCategories) return <p>Cargando categorias...</p>;
  return ( 
  <div>
    <h2>{editingCategory ? "Editar categoría" : "Crear categoría"}</h2>
    <form onSubmit={editingCategory ? handleEditCategory : handleCreateCategory}>
      <input
      type="text"
      placeholder="Nombre"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      />
      <input
      type="text"
      placeholder="Descripción"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      />
      <button type="submit" disabled={creatingCategory}>
        {(editingCategory ? "Actualizar" : "Agregar")}
      </button>
      {editingCategory && (
      <button
      type="button"
      onClick={() => {
      setEditingCategory(null);
      setName("");
      setDescription("");
      }}
      >
      Cancelar
      </button>
      )}
    </form>

    <h3>Categorías existentes</h3>
    {categories.map((cat) => (
    <div key={cat._id}>
    <h4>{cat.name}</h4>
    <p>{cat.description}</p>
    <button onClick={() => handleDeleteCategory(cat._id)}>Eliminar</button>
    <button onClick={() => handleEditClick(cat)}>Editar</button>
    </div>
    ))}
</div>);
}