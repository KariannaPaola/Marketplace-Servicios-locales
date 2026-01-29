import { sendMessage , getMessages} from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/auth.js";

import { Router } from "express";
const router = Router();

router.post("/sendMessage/:chat_Id",authMiddleware, sendMessage);
router.get("/getMessages/:chatId",authMiddleware, getMessages);

export default router;