/**
 * Modelo de Categorías.
 *
 * Este módulo define la estructura de datos para las categorías en la base de datos.
 *
 * Campos:
 * - name: nombre de la categoría (obligatorio, único entre categorías no eliminadas, en mayúsculas)
 * - description: descripción opcional de la categoría
 * - created_by: referencia al usuario que creó la categoría (obligatorio)
 * - updated_by: referencia al usuario que actualizó la categoría (opcional)
 * - is_deleted: bandera para indicar si la categoría fue eliminada (default: false)
 * - deleted_at: fecha en que la categoría fue eliminada (opcional)
 * - deleted_by: referencia al usuario que eliminó la categoría (opcional)
 *
 * Reglas y consideraciones:
 * - Se crea un índice único compuesto en { name, is_deleted } para evitar duplicados de categorías activas
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt` al documento
 * - Todas las referencias a usuario utilizan ObjectId y apuntan al modelo User
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import Category from './categories.model.js';
 *   const nuevaCategoria = await Category.create({ name: 'LIMPIEZA', created_by: userId });
 *
 * @module Category
 */

import mongoose from "mongoose";

const categoriesSchema= new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  description:{
    type: String
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  is_deleted:{
    type: Boolean,
    default: false
  },
  deleted_at:{
    type: Date,
    default: null
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
},
{timestamps: true}
)
categoriesSchema.index({ name: 1, is_deleted: 1 },{ unique: true });
const Category=mongoose.model("Category", categoriesSchema);
export default Category;

