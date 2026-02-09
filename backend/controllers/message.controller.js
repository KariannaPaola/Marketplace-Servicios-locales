/**
 * Controladores para la gestión de mensajes en chats.
 *
 * Este módulo permite:
 * - Enviar mensajes dentro de un chat
 * - Listar todos los mensajes de un chat
 *
 * Reglas y consideraciones:
 * - Solo los participantes del chat pueden enviar o leer mensajes
 * - Los mensajes se asocian al usuario que los envía y al chat correspondiente
 * - Los mensajes se ordenan por fecha de creación ascendente al listar
 *
 * Dependencias:
 * - Modelo Chat (MongoDB / Mongoose)
 * - Modelo Message (MongoDB / Mongoose)
 * - Variables de entorno cargadas con dotenv
 *
 * Uso típico en Express:
 *   import { sendMessage, getMessages } from "./messages.controller.js";
 *
 * @module messagesController
 */

import dotenv from 'dotenv';
dotenv.config();
import Chat from '../models/chat-models.js';
import Message from '../models/messages.models.js';


export const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  const user = req.user;
  
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    const isParticipant = chat.client_Id.toString() === user._id.toString() || chat.provider_Id.toString() === user._id.toString();
    if (!isParticipant) return res.status(403).json({ error: "No autorizado para este chat" });
    const message = new Message({
      chat_Id: chat._id,
      sender_Id: user._id,
      content,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
  res.status(500).json({ message: "Error al enviar mensaje", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const user = req.user;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ error: "Chat no encontrado" });
    const isParticipant = chat.client_Id.toString() === user._id.toString() || chat.provider_Id.toString() === user._id.toString();
    if (!isParticipant) return res.status(403).json({ error: "No autorizado para este chat" });
    const messages = await Message.find({ chat_Id: chat._id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error al listar mensajes", error: error.message });
  }
};

