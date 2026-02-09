import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { getChat } from "../../services/auth";
import { getMessages } from "../../services/auth";
import { useContext } from "react";
import { sendMessage } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import { pendingRequest } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function ChatPage ()  {
  const { chatId } = useParams();;
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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
  const handleHire = async (Id_provider) => {
      try {
        const data= await pendingRequest(Id_provider); 
        navigate(`/request/${data.request._id}`); 
      } catch (error) {
        setError("Ya tienes una solictud en curso con este proveedor")
      }
    };

  const isParticipant = chat && (chat.client_Id._id === user.id || chat.provider_Id._id === user.id);

  if (loading) return <p>cargando chat</p>

  return (
    <div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    <div className="max-w-3xl mx-auto mt-4 p-5 flex flex-col h-[80vh] bg-white border border-white rounded-lg shadow">
      <div className="border-b border-gray-300 pb-3 mb-3 flex item-center gap-6">
        <h2 className="text-lg font-semibold">
          Chat con{" "}
          {chat.client_Id._id === user.id
            ? `${chat.provider_Id.name} ${chat.provider_Id.lastname}`
            : `${chat.client_Id.name} ${chat.client_Id.lastname}`}
        </h2>
        {chat.client_Id._id ===user.id?
          <button 
            className="bg-blue-800 hover:bg-green-600 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg font-medium"
            onClick={() => handleHire(chat.provider_Id._id)}>
            Contratar
          </button>
          : ""
        }
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3 bg-gray-50 rounded">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            Sin mensajes aún
          </p>
        )}
        {messages.map((msg) => {
          const isMine = msg.sender_Id === user.id;

          const senderName = isMine
              ? chat.client_Id._id === user.id
                ? `${chat.client_Id.name} ${chat.client_Id.lastname}`
                : `${chat.provider_Id.name} ${chat.provider_Id.lastname}`
              : chat.client_Id._id === user.id
                ? `${chat.provider_Id.name} ${chat.provider_Id.lastname}`
                : `${chat.client_Id.name} ${chat.client_Id.lastname}`;
          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow
                ${isMine
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-300 text-neutral-950 rounded-bl-none"
                }`}>
                <p className="text-xs font-semibold mb-1 opacity-80">
                  {senderName}
                </p>
                <p>{msg.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      {isParticipant ? (
        <div className="mt-3 flex gap-2 border-t  border-gray-300 pt-3">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-gray-200 text-ms rounded-full px-4 py-2 focus:outline-none "
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-green-600 text-white px-5 rounded-full font-medium">
            Enviar
          </button>
        </div>
      ) : (
        <p className="text-red-500 mt-3 text-center text-sm">
          No autorizado para enviar mensajes en este chat
        </p>
      )}
    </div>
  </div>
  );
};
