import { registerUser, loginUser, verifyEmail,  recoverPassword, changePassword } from "../controllers/auth.controller";
import { Router } from "express";
const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/verify-email/:token", verifyEmail);
router.post("/auth/recover-password", recoverPassword);
router.post("/auth/change-password/:token", changePassword);

export default authRoutes;