/**
 * Modelo de Mensajes (Message).
 *
 * Este módulo define la estructura de datos para los mensajes dentro de un chat.
 *
 * Campos:
 * - chat_Id: referencia al chat al que pertenece el mensaje (obligatorio)
 * - sender_Id: referencia al usuario que envía el mensaje (obligatorio)
 * - content: contenido del mensaje en texto (obligatorio)
 *
 * Reglas y consideraciones:
 * - `chat_Id` es una referencia al modelo `Chat`
 * - `sender_Id` es una referencia al modelo `User`
 * - `timestamps` personalizado: se guarda `created_at` pero no se actualiza `updatedAt`
 * - Cada mensaje pertenece a un chat específico y tiene un remitente definido
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import Message from './message.model.js';
 *   const nuevoMensaje = await Message.create({
 *     chat_Id: chatId,
 *     sender_Id: userId,
 *     content: "Hola, ¿cómo estás?"
 *   });
 *
 * @module Message
 */

import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
  chat_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat"
  },
  sender_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  content:{
    type: String,
    required: true,
  },
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: false
  },
} 
)

const Message=mongoose.model("Message", messageSchema)
export default Message;