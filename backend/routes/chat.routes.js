/**
 * Rutas de Chat (Chat Routes).
 *
 * Este módulo define los endpoints relacionados con la creación
 * y consulta de conversaciones entre clientes y proveedores.
 *
 * Endpoints:
 *
 * - POST /createChat/:Id_provider
 *   Crea un nuevo chat entre el usuario autenticado y un proveedor.
 *
 *   Parámetros:
 *     - Id_provider: identificador del proveedor con quien se iniciará la conversación
 *
 *   Requiere autenticación.
 *   Middleware:
 *     - authMiddleware
 *
 *   Controlador:
 *     - createChat
 *
 * - GET /chat/:chatId
 *   Obtiene la información y/o mensajes de un chat específico.
 *
 *   Parámetros:
 *     - chatId: identificador del chat
 *
 *   Requiere autenticación.
 *   Middleware:
 *     - authMiddleware
 *
 *   Controlador:
 *     - getChat
 *
 * Reglas y consideraciones:
 * - Solo usuarios autenticados pueden crear o consultar chats.
 * - La lógica de validación (por ejemplo, verificar que el usuario
 *   pertenezca al chat) debe implementarse en el controlador.
 *
 * Dependencias:
 * - express (Router)
 * - chat.controller.js
 * - auth middleware
 *
 * Uso típico:
 *   import chatRoutes from './routes/chat.routes.js';
 *   app.use('/api/chat', chatRoutes);
 *
 * @module ChatRoutes
 */

import { createChat, getChat } from "../controllers/chat.controller.js";
import authMiddleware from "../middlewares/auth.js";
import { Router } from "express";
const router = Router();

router.post("/createChat/:Id_provider",authMiddleware, createChat);
router.get("/chat/:chatId", authMiddleware, getChat);


export default router;