/**
 * Modelo de Solicitudes (Request).
 *
 * Este módulo define la estructura de datos para las solicitudes de servicios
 * realizadas por los clientes a los proveedores dentro del sistema.
 *
 * Campos:
 * - client_Id: referencia al usuario que realiza la solicitud (obligatorio)
 * - provider_Id: referencia al usuario proveedor que recibe la solicitud (obligatorio)
 * - details: objeto con información específica del servicio solicitado:
 *    - name_service: nombre del servicio solicitado (opcional)
 *    - description: descripción adicional del requerimiento (opcional, por defecto null)
 *    - date: fecha propuesta para la ejecución del servicio (opcional)
 * - status: estado actual de la solicitud, uno de
 *   ["creada", "pendiente", "en_curso", "completado", "cancelado"]
 *   (obligatorio, por defecto "creada")
 * - chat_Id: referencia al chat asociado a la solicitud (opcional)
 * - hiring_date: fecha en la que se formaliza la contratación (opcional)
 * - updated_by: referencia al usuario que realizó la última actualización (opcional)
 * - deleted_at: fecha de eliminación lógica de la solicitud (opcional)
 * - deleted_by: referencia al usuario que realizó la eliminación lógica (opcional)
 * - is_deleted: indica si la solicitud fue eliminada lógicamente (por defecto false)
 *
 * Reglas y consideraciones:
 * - `client_Id` y `provider_Id` referencian al modelo `User`
 * - `chat_Id` referencia al modelo `Chat`
 * - El campo `status` controla el flujo del ciclo de vida de la solicitud
 * - Se implementa eliminación lógica mediante `is_deleted`, `deleted_at` y `deleted_by`
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt`
 * - Se crea un índice compuesto único en `{ provider_Id, client_Id, status }`
 *   para evitar solicitudes duplicadas con el mismo proveedor, cliente y estado
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import Request from './request.models.js';
 *   const nuevaSolicitud = await Request.create({
 *     client_Id: clientId,
 *     provider_Id: providerId,
 *     details: {
 *       name_service: "Reparación de tuberías",
 *       description: "Fuga en el baño principal",
 *       date: new Date("2026-02-15")
 *     }
 *   });
 *
 * @module Request
 */

import mongoose from "mongoose";

const requestSchema= new mongoose.Schema({
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
  details:{
    type: {
      name_service:{
        type: String,
        required:false
      },
      description:{
        type: String,
        default:null
      },
      date:{
        type: Date,
        required:false
      }
    },
  },
  status:{
    type: String,
    required: true,
    enum: ["creada","pendiente", "en_curso", "completado","cancelado"],
    default: "creada"
  },
  chat_Id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Chat",
  default: null,
},
  hiring_date:{
    type: Date,
    default: null
  },
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  deleted_at:{
    type: Date,
    default: null,
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  is_deleted:{
    type: Boolean,
    default: false,
  },
},
{timestamps: true}
)
requestSchema.index(
  { provider_Id: 1, client_Id: 1, status: 1 },
  { unique: true }
);
const Request=mongoose.model("Request", requestSchema);
export default Request;
