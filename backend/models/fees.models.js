/**
 * Modelo de Tarifas (Fees).
 *
 * Este módulo define la estructura de datos para las tarifas asociadas a solicitudes de proveedores.
 *
 * Campos:
 * - request_Id: referencia a la solicitud asociada (obligatorio y único)
 * - provider_Id: referencia al proveedor que cobra la tarifa (obligatorio)
 * - amount_usd: monto en dólares (obligatorio, tipo Decimal128)
 * - amount_bs: monto en bolívares (obligatorio, tipo Decimal128)
 * - payment_reference: referencia del pago (opcional)
 * - status: estado de la tarifa, uno de ["pendiente", "pagado", "aprobado", "rechazado"] (por defecto "pendiente")
 * - expiration_date: fecha de expiración de la tarifa (obligatorio)
 * - date_payment: fecha de pago (opcional)
 * - updated_by: referencia al usuario que actualizó la tarifa (opcional)
 *
 * Reglas y consideraciones:
 * - Cada solicitud (`request_Id`) solo puede tener una tarifa asociada (campo único)
 * - `status` solo puede tener valores definidos en el enum
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt`
 * - Se usan referencias a otros modelos (`User` y `Request`) mediante ObjectId
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import Fee from './fees.models.js';
 *   const nuevaTarifa = await Fee.create({
 *     request_Id: requestId,
 *     provider_Id: providerId,
 *     amount_usd: 100.00,
 *     amount_bs: 250.00,
 *     expiration_date: new Date('2026-03-01')
 *   });
 *
 * @module Fee
 */

import mongoose from "mongoose";

const feeSchema= new mongoose.Schema({
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Request",
    unique:true
  },
  provider_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  amount_usd:{
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  amount_bs:{
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },  
  payment_reference:{
    type: String,
    default: null
  },
  status:{
    type: String,
    required: true,
    enum: ["pendiente", "pagado", "aprobado", "rechazado"],
    default: "pendiente"
  },
  expiration_date:{
    type: Date,
    required: true,
  },
  date_payment:{
    type: Date,
    default: null,
  },
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{timestamps: true}
)

const Fee=mongoose.model("Fee", feeSchema);
export default Fee;
