/**
 * Modelo de Reseñas (Review).
 *
 * Este módulo define la estructura de datos para las reseñas realizadas
 * por los clientes a los proveedores una vez completado un servicio.
 *
 * Campos:
 * - request_Id: referencia a la solicitud asociada a la reseña (obligatorio y único)
 * - client_Id: referencia al usuario cliente que realiza la reseña (obligatorio)
 * - provider_Id: referencia al usuario proveedor que recibe la reseña (obligatorio)
 * - rating: puntuación otorgada al proveedor (obligatorio, rango de 1 a 5)
 * - comment: comentario opcional del cliente (máximo 500 caracteres, con trim)
 * - reported: indica si la reseña ha sido reportada (por defecto false)
 * - reported_by: referencia al usuario que reportó la reseña (opcional)
 * - reported_at: fecha en la que la reseña fue reportada (opcional)
 * - visible: indica si la reseña es visible públicamente (por defecto true)
 * - is_deleted: indica si la reseña fue eliminada lógicamente (por defecto false)
 * - deleted_by: referencia al usuario que realizó la eliminación lógica (opcional)
 *
 * Reglas y consideraciones:
 * - `request_Id` referencia al modelo `Request`
 * - `client_Id`, `provider_Id` y `reported_by` referencian al modelo `User`
 * - Solo puede existir una reseña por solicitud, garantizado mediante
 *   un índice único en `{ request_Id: 1 }`
 * - `rating` está restringido entre 1 y 5
 * - `comment` tiene un límite máximo de 500 caracteres
 * - Se implementa moderación mediante `reported`, `reported_by` y `reported_at`
 * - Se implementa eliminación lógica mediante `is_deleted` y `deleted_by`
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt`
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import Review from './review.models.js';
 *   const nuevaReseña = await Review.create({
 *     request_Id: requestId,
 *     client_Id: clientId,
 *     provider_Id: providerId,
 *     rating: 5,
 *     comment: "Excelente servicio, muy puntual y profesional."
 *   });
 *
 * @module Review
 */

import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Request"
  },
  client_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  provider_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  rating:{
    type: Number,
    min: 1,
    max: 5,
    required:true
  },
  comment:{
    type: String,
    maxlength: 500,
    trim: true
  },
  reported: { 
    type: Boolean, 
    default: false 
  }, 
  reported_by: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
  },
  reported_at: {
  type: Date,
  default: null
  },
  visible:{ 
    type: Boolean, 
    default: true 
  },
  is_deleted:{
    type: Boolean,
    default: false,
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{timestamps: true}
)
reviewSchema.index({ request_Id: 1 }, { unique: true });
const Review=mongoose.model("Review", reviewSchema)
export default Review;