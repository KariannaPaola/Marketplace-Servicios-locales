import { useEffect, useState } from "react";
import { createChat, getMessages, sendMessage, pendingRequest } from "../../services/auth";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


export default function useChatClient (){
  const navigate = useNavigate();
  const { Id_provider } = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { user} = useContext(AuthContext);
  const hasInitRef = useRef(false);
  const isProvider = user.id === Id_provider;
  
  useEffect (()=>{
    if (!Id_provider) return;
    if (hasInitRef.current) return;
    hasInitRef.current = true;
    const initChat = async () => {
    try {
      const data = await createChat(Id_provider);
      if (!data?.chat) {
      console.error("Chat no recibido", data);
      return;
      }
      setChat(data.chat);
      console.log(data)
      setLoading(false);
    } catch (error) {
      console.error("Error creando chat", error);
    }
    };
  initChat()
  }, [Id_provider])

  const fetchMessages = async (id) => {
    try {
      const data = await getMessages(id);
      setMessages(data);
    } catch (error) {
      console.error("Error obteniendo mensajes", error);
    }
  };

  const handleSendMessage = async () => {
    if (!content.trim()) return;
    try {
      await sendMessage(chat._id, content );
      setContent("");
    } catch (error) {
      console.error("Error enviando mensaje", error);
    }
  };

  useEffect(() => {
    if (!chat) return;
    fetchMessages(chat._id);
    const interval = setInterval(() => {
      fetchMessages(chat._id);
    }, 2000);  
    return () => clearInterval(interval);
  }, [chat]);

  const handleHire = async () => {
    try {
      const data= await pendingRequest(Id_provider); 
      console.log(data)
      navigate(`/request/${data.request._id}`); 
    } catch (error) {
      console.error("Error al crear la solicitud", error);
    }
  };

  return{setContent, isProvider,loading, handleHire, messages, content, handleSendMessage }
}