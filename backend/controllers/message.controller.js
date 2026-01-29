import dotenv from 'dotenv';
dotenv.config();
import Chat from '../models/chat-models.js';
import Message from '../models/messages.models.js';


export const sendMessage = async (req, res) => {
  const { chat_Id } = req.params;
  const { content } = req.body;
  const user = req.user;
  
  try {
    const chat = await Chat.findById(chat_Id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    const isParticipant = chat.userA.toString() === user._id.toString() || chat.userB.toString() === user._id.toString();
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
    const isParticipant = chat.userA.toString() === user._id.toString() || chat.userB.toString() === user._id.toString();
    if (!isParticipant) return res.status(403).json({ error: "No autorizado para este chat" });
    const messages = await Message.find({ chat_Id: chat._id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
  res.status(500).json({ message: "Error al listar mensajes", error: error.message });
  }
};

