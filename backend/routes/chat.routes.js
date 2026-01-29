import { createChat, linkChatToRequest } from "../controllers/chat.controller.js";
import authMiddleware from "../middlewares/auth.js";
import { Router } from "express";
const router = Router();

router.post("/createChat/:Id_provider",authMiddleware, createChat);
router.patch("/linkchatToRequest/:chatId/:requestId",authMiddleware,linkChatToRequest);

export default router;