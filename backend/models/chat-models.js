/**
 * Modelo de Chat.
 *
 * Este módulo define la estructura de datos para los chats entre clientes y proveedores.
 *
 * Campos:
 * - client_Id: referencia al usuario cliente (obligatorio)
 * - provider_Id: referencia al usuario proveedor (obligatorio)
 * - request_Id: referencia a la solicitud asociada al chat (obligatorio y único)
 *
 * Reglas y consideraciones:
 * - Cada solicitud (`request_Id`) solo puede tener un chat asociado (campo único)
 * - Se utilizan referencias a otros modelos (`User` y `Request`) mediante ObjectId
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt` al documento
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import Chat from './chat.model.js';
 *   const nuevoChat = await Chat.create({ client_Id: clientId, provider_Id: providerId, request_Id: requestId });
 *
 * @module Chat
 */

import mongoose from "mongoose";

const chatSchema= new mongoose.Schema({
  client_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  provider_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  request_Id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
    unique: true
  },
}, 
{timestamps: true}
)


const Chat=mongoose.model("Chat", chatSchema)
export default Chat;