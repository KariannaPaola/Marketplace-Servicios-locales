/**
 * Rutas de Mensajes (Message Routes).
 *
 * Este módulo define los endpoints para el envío y obtención de mensajes
 * dentro de los chats entre usuarios (clientes y proveedores).
 *
 * Endpoints:
 *
 * - POST /sendMessage/:chatId
 *   Envía un mensaje a un chat específico.
 *
 *   Parámetros:
 *     - chatId: identificador del chat al que se enviará el mensaje
 *
 *   Requiere autenticación.
 *   Middleware:
 *     - authMiddleware: valida que el usuario esté autenticado
 *
 *   Controlador:
 *     - sendMessage
 *
 * - GET /getMessages/:chatId
 *   Obtiene todos los mensajes de un chat específico.
 *
 *   Parámetros:
 *     - chatId: identificador del chat del cual se obtendrán los mensajes
 *
 *   Requiere autenticación.
 *   Middleware:
 *     - authMiddleware: valida que el usuario esté autenticado
 *
 *   Controlador:
 *     - getMessages
 *
 * Reglas y consideraciones:
 * - Solo usuarios autenticados pueden enviar o consultar mensajes en los chats.
 * - Los mensajes se asocian a un chat específico, y su validación de acceso
 *   debe manejarse en el controlador (por ejemplo, verificar que el usuario pertenezca al chat).
 *
 * Dependencias:
 * - express (Router)
 * - message.controller.js
 * - auth middleware
 *
 * Uso típico:
 *   import messageRoutes from './routes/message.routes.js';
 *   app.use('/api/messages', messageRoutes);
 *
 * @module MessageRoutes
 */

import { sendMessage , getMessages} from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/auth.js";
import { Router } from "express";
const router = Router();

router.post("/sendMessage/:chatId",authMiddleware, sendMessage);
router.get("/getMessages/:chatId",authMiddleware, getMessages);

export default router;