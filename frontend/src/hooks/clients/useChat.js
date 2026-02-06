import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getChat, getMessages, sendMessage, createChat } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";

export default function useChat() {
  const { chatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const providerId = query.get("providerId"); 

  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (chatId) {
          const chatData = await getChat(chatId);
          setChat(chatData);
          const msgs = await getMessages(chatId);
          setMessages(msgs);
        }
      } catch (error) {
        console.error("Error cargando chat:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!content.trim() || !chat) return;
    try {
      await sendMessage(chat._id, content);
      setContent("");
      const msgs = await getMessages(chat._id);
      setMessages(msgs);
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  const handleStartChat = async () => {
    if (!providerId) return;
    try {
      const data = await createChat(providerId);
      setChat(data.chat);
      const msgs = await getMessages(data.chat._id);
      setMessages(msgs);
      navigate(`/Chat/${data.chat._id}`);
    } catch (error) {
      console.error("Error al crear chat:", error);
    }
  };

  const isParticipant = chat && (chat.userA === user.id || chat.userB === user.id);

  return { chat, messages, content, setContent, handleSendMessage, handleStartChat, loading, isParticipant, providerId };
}