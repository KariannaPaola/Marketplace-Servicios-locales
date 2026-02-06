import React from "react";
import useChat from "../hooks/useChat";
import { AuthContext } from "../context/AuthContext";

export default function ChatComponent() {
  const { chat, messages, content, setContent, handleSendMessage, handleStartChat, loading, isParticipant, providerId } = useChat();
  const { user } = React.useContext(AuthContext);

  if (loading) return <p className="text-center mt-5">Cargando chat...</p>;

  if (!chat && providerId) {
    return (
      <div className="max-w-3xl mx-auto p-5 text-center">
        <h2 className="text-xl font-bold mb-4">Empezar a cotizar con el proveedor</h2>
        <button
          onClick={handleStartChat}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Empezar a cotizar
        </button>
      </div>
    );
  }

  if (!chat) return <p className="text-center mt-5 text-red-500">Chat no encontrado o no autorizado</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-xl font-bold mb-4">
        Chat con {chat.client_Id === user.id ? chat.provider_Id : chat.client_Id}
      </h2>

      <div className="border rounded p-3 mb-4 max-h-96 overflow-y-auto bg-gray-50">
        {messages.length === 0 && <p className="text-gray-500">Sin mensajes aún</p>}
        {messages.map((msg) => (
          <div key={msg._id} className={`mb-2 ${msg.sender_Id === user.id ? "text-right" : "text-left"}`}>
            <span className="font-semibold">{msg.sender_Id === user.id ? "Tú" : "Proveedor"}: </span>
            {msg.content}
          </div>
        ))}
      </div>

      {isParticipant ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 hover:bg-green-600 text-white px-4 rounded"
          >
            Enviar
          </button>
        </div>
      ) : (
        <p className="text-red-500 mt-3">No autorizado para enviar mensajes en este chat</p>
      )}
    </div>
  );
}