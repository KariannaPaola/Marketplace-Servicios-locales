import { registerUser, loginUser, verifyEmail,  recoverPassword, changePassword } from "../controllers/auth.controller.js";
import { Router } from "express";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/recover-password", recoverPassword);
router.post("/change-password/:token", changePassword);

export default router;