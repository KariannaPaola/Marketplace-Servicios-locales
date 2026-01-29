import { useEffect, useState } from "react";
import { createChat, getMessages, sendMessage, createRequest } from "../../services/auth";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat ()  {
  const navigate = useNavigate();
  const { Id_provider } = useParams();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { user} = useContext(AuthContext);
  const isProvider = user.id === Id_provider;

  useEffect (()=>{
    const initChat = async () => {
    try {
      const data = await createChat(Id_provider);
      setChat(data);
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
      const data= await createRequest(Id_provider); 
      console.log(data)
      navigate(`/request/${data.request._id}`); 
    } catch (error) {
      console.error("Error al crear la solicitud", error);
    }
  };

  if (loading) return <p>Cargando chat...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", maxWidth: "400px" }}>
      <h3>Chat</h3>

      {isProvider? "": <button disabled={loading} onClick={handleHire}>
      {loading ? "Creando..." : "Contratar"}</button> } 
      <div style={{ height: "300px", overflowY: "auto", marginBottom: "1rem" }}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              margin: "0.5rem 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "0.5rem",
                borderRadius: "5px",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe un mensaje"
          style={{ flex: 1 }}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};
