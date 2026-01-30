import dotenv from 'dotenv';
dotenv.config();
import Chat from '../models/chat-models.js';


export const createChat= async (req, res) => {
  const { Id_provider } = req.params;
  const user=req.user;
  const [userA, userB] = [user._id, Id_provider].sort();
  
  try{
    const chat = await Chat.findOneAndUpdate(
    { userA, userB },
    { $setOnInsert: { userA, userB } },
    { upsert: true, new: true }
    );
    res.json(chat);
  } catch (error) {
    if (error.code === 11000) {
      const chat = await Chat.findOne({ userA, userB });
      return res.json(chat);
    }
    res.status(500).json({ 
    message: "Error al crear chat"
    });
  }
}

export const linkChatToRequest = async (req, res) => {
  const { chatId, requestId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    if (chat) {
      chat.request_Id = requestId;
      await chat.save();
    }
  } catch (error) {
      console.error("Error vinculando chat a solicitud:", error.message);
  }
};