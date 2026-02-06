import React from "react";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../services/auth";

/**
 * Botones para:
 * 1️⃣ Cliente: empezar a cotizar con un proveedor
 * 2️⃣ Cliente o proveedor: ver chat existente
 */
export default function ChatButtons({ chatId, providerId }) {
  const navigate = useNavigate();

  // 1️⃣ Botón para “Empezar a cotizar” (solo cliente)
  const handleStartChat = async () => {
    try {
      const data = await createChat(providerId); // crea request + chat
      navigate(`/Chat/${data.chat._id}`);
    } catch (error) {
      console.error("Error al crear chat", error);
    }
  };

  // 2️⃣ Botón para “Ver Chat” (cliente o proveedor)
  const handleViewChat = () => {
    if (!chatId) return;
    navigate(`/Chat/${chatId}`); // solo lectura
  };

  return (
    <div className="flex flex-col gap-3">
      {providerId && (
        <button
          onClick={handleStartChat}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Empezar a cotizar
        </button>
      )}

      {chatId && (
        <button
          onClick={handleViewChat}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Ver Chat
        </button>
      )}
    </div>
  );
}