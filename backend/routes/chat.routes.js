import { createChat, getChat } from "../controllers/chat.controller.js";
import authMiddleware from "../middlewares/auth.js";
import { Router } from "express";
const router = Router();

router.post("/createChat/:Id_provider",authMiddleware, createChat);
router.get("/chat/:chatId", authMiddleware, getChat);


export default router;