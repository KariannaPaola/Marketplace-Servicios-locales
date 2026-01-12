import { registerUser, verifyEmail, recoverPassword, changePassword, loginUser, protectUser } from "../controllers/users.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protegida",authMiddleware, protectUser);
router.get("/verify/:token", verifyEmail);
router.post("/recoverPassword", recoverPassword);
router.post("/changePassword/:token", changePassword);



export default router; 