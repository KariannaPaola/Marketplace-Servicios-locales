/**
 * Modelo de Proveedores (Provider).
 *
 * Este módulo define la estructura de datos para los proveedores registrados en el sistema.
 *
 * Campos:
 * - user_Id: referencia al usuario asociado al proveedor (obligatorio y único)
 * - profession: profesión del proveedor (obligatorio)
 * - description: descripción del proveedor (obligatorio)
 * - categories: referencia a la categoría del proveedor (obligatorio)
 * - state: referencia al estado del proveedor (obligatorio)
 * - rating: promedio de puntuación del proveedor (0 a 5, por defecto 0)
 * - ratingCount: cantidad de reseñas recibidas (por defecto 0)
 * - services_offered: array de servicios ofrecidos con nombre y precio (obligatorio, al menos 1)
 * - membership_premium: información de membresía premium (activo, fecha de inicio, fecha de fin)
 * - profile_visible: indica si el perfil del proveedor es visible (por defecto false)
 * - status: estado de aprobación del proveedor, uno de ["pending", "approved", "rejected"] (por defecto "pending")
 * - updated_by: referencia al usuario que actualizó el perfil (opcional)
 * - is_deleted: indica si el proveedor está eliminado (por defecto false)
 * - deleted_at: fecha de eliminación (opcional)
 * - deleted_by: referencia al usuario que eliminó el proveedor (opcional)
 *
 * Reglas y consideraciones:
 * - `services_offered` debe contener al menos un servicio
 * - `categories` y `state` son referencias a otros modelos (`Category` y `State`)
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt`
 * - Se crea un índice en `{ categories, is_deleted }` para optimizar búsquedas de proveedores activos por categoría
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import Provider from './provider.models.js';
 *   const nuevoProveedor = await Provider.create({
 *     user_Id: userId,
 *     profession: "Plomero",
 *     description: "Servicio rápido y confiable",
 *     categories: categoryId,
 *     state: stateId,
 *     services_offered: [{ name_service: "Reparación de tuberías", price: 50 }]
 *   });
 *
 * @module Provider
 */


import mongoose from "mongoose";

const providerSchema= new mongoose.Schema({
  user_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique:true,
    ref: "User"
  },
  profession:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  direction:{
    type: String,
    required: true,
  },
  categories:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  state:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true
  },
  rating:{
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  ratingCount: {
  type: Number,
  default: 0
  },
  services_offered: {
  type: [
    {
      name_service: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ],
  validate: {
    validator: 
    function (v){
      return v?.length > 0}
      },
  required: true,
},
  membership_premium:{
    type: {
      active:{
        type: Boolean,
        default:false
      },
      start_date:{
        type: Date,
        default: null
      },
      end_date:{
        type: Date,
        default: null
      }
    },
    default: {}
  },
  profile_visible:{
    type: Boolean,
    default: false,
  },
  status: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending"
  },
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  is_deleted:{
    type: Boolean,
    default: false,
  },
  deleted_at:{
    type: Date,
    default: null,
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }
},
{timestamps: true}
)
providerSchema.index({
  categories: 1,
  state: 1,
  is_deleted: 1,
  profile_visible: 1,
  status: 1
});
const Provider=mongoose.model("Provider", providerSchema)
export default Provider;