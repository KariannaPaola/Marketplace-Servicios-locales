import dotenv from 'dotenv';
dotenv.config();
import Chat from '../models/chat-models.js';
import Provider from '../models/provider.models.js';
import Request from '../models/request.models.js';


export const createChat= async (req, res) => {
  const { Id_provider } = req.params;
  const user=req.user;
  try {
    if (!Id_provider) {
      return res.status(400).json({ message: "Proveedor requerido" });
    }
    const provider=await Provider.findOne({ user_Id: Id_provider, is_deleted: false, profile_visible: true  });
    if (!provider) return res.status(404).json({message:'Proveedor no encontrado'});
    
    const existingRequest = await Request.findOne({
      client_Id: user._id,
      provider_Id: Id_provider,
      status: { $in: ["pendiente", "en_curso", "creada"] },
      is_deleted: false,
    });
    if (existingRequest) {
      const existingChat = await Chat.findOne({ request_Id: existingRequest._id });
      return res.status(200).json({ chat: existingChat, request: existingRequest, message: "Ya existe una solicitud activa" });
    }
    const activeRequests = await Request.countDocuments({
      client_Id: user._id,
      status: { $in: ["pendiente", "en_curso", "creada"] },
      is_deleted: false,
    });
    if (activeRequests >= 3) {
      return res.status(400).json({
      message: "Máximo 3 solicitudes activas permitidas",
      });
    }
    
    const newRequest = await Request.create({
      client_Id: user._id,
      provider_Id: Id_provider ,
      status: "creada",
      details: null,
      hiring_date: null,
    });

    const chat = await Chat.create({
  client_Id: user._id,        
  provider_Id: Id_provider,   
  request_Id: newRequest._id,
  });
    newRequest.chat_Id = chat._id;
    await newRequest.save();
    return res.status(201).json({
      chat,
      request: newRequest
    });
    
  } catch (error) {
    res.status(500).json({ 
    message: "Error al crear chat"
    });
  }
}

export const getChat = async (req, res) => {
  console.log( "entre a getchat" )
  const { chatId } = req.params;
  const user = req.user;

  try {
    const chat = await Chat.findById(chatId)
    .populate("client_Id", "name lastname" )
    .populate("provider_Id", "_id name lastname" )
    .select("client_Id provider_Id request_Id")
    if (!chat) return res.status(404).json({ message: "Chat no encontrado" });

    const isParticipant =
      chat.client_Id._id.toString() === user._id.toString() ||
      chat.provider_Id._id.toString() === user._id.toString();

    if (!isParticipant) return res.status(403).json({ message: "No autorizado" });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo chat" });
  }
};