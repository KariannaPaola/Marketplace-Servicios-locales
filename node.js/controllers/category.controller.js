import dotenv from 'dotenv';
dotenv.config();
import Provider from '../models/provider.models.js';
import Category from '../models/categories.models.js';

export const createCategory= async (req, res) => {
  const user=req.user;
  const {name, description} =  req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "debe ingresar el nombre de la categoria" });
    }
    const nameNormalized=name.trim().toUpperCase();
    const exists = await Category.findOne({ 
    name: nameNormalized ,
    is_deleted: false
    });
    if (exists) {
    return res.status(409).json({ message: "La categoría ya existe" });
    }
    const newCategory = await Category.create({
      name: nameNormalized,
      description: description || null ,
      created_by: user._id
    });
    return res.status(201).json({
    message: "categoria creada exito",
    category: newCategory
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al crear categoria", 
    error: error.message || error.toString() 
    });
  }
}

export const getCategories = async (req, res) => {
  try {
    const filter = { is_deleted: false };
    const categories = await Category.find(filter)
    .select('name description')
    .sort({ name: 1 });
    return res.status(200).json({
      total: categories.length,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar categorias' });
  }
};

export const getCategoriesAdmin = async (req, res) => {
  try {
    const filter = {};
    const categories = await Category.find(filter)
      .populate('created_by', 'name lastname') 
      .populate('updated_by', 'name lastname')
      .populate('deleted_by', 'name lastname')
      .select('name description is_deleted deleted_at createdAt updatedAt')
      .sort({ name: 1 });
    return res.status(200).json({
      total: categories.length,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al listar categorias' });
  }
};

export const editCategory= async (req, res) => {
  const user=req.user;
  const {id}=req.params;
  const { name, description} =  req.body;
  try{
    const category = await Category.findOne({ _id: id, is_deleted:false});
    if (!category) return res.status(404).json({message:'categoria no encontrada'});
    if (!name && description===undefined) return res.status(400).json({message:'debes ingresar al menos un campo para modificar la categoria'});
    if (name) {
    const nameNormalized=name.trim().toUpperCase();
    const categoryExist= await Category.findOne({  _id: { $ne: id }, name: nameNormalized, is_deleted:false});
    if (categoryExist) return res.status(409).json({message:'Ya existe una categoria con ese nombre'});
    category.name = nameNormalized;
    }
    if (description !==undefined) {
      category.description= description;
    }
    category.updated_by = user._id;
    await category.save();
    return res.status(200).json({
      message: "categoria actualizada con exito",
      category: category
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al editar categoria", 
    error: error.message || error.toString() 
    });
  }
}

export const deleteCategory= async (req, res) => {
  const {id}=req.params;
  const user=req.user;
  try{
    const category = await Category.findOne({ _id: id, is_deleted: false, });
    if (!category) return res.status(404).json({message:'categoria no encontrada',});
    const providersCount = await Provider.countDocuments({
      categories: id,
      is_deleted: false
    });
    if (providersCount > 0) {
      return res.status(409).json({
        message: 'No se puede eliminar la categoría porque tiene proveedores asociados'
      });
    }
    category.is_deleted=true;
    category.deleted_at=new Date();
    category.deleted_by= user._id;
    await category.save();
    return res.status(200).json({
      message: "categoria eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({ 
    message: "Error al eliminar categoria", 
    error: error.message || error.toString() 
    });
  }
}