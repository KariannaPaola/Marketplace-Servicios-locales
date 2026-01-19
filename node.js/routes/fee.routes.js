import { paymentRegister, verifyFee, listAllFees, myFees } from "../controllers/fee.controller";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleProvider, authRoleAdmin } from "../middlewares/role.js";

const router = Router();

router.post("/fees/:id/pay",authMiddleware, authRoleProvider, paymentRegister);
router.post("/fees/:id/verify",authMiddleware, authRoleAdmin, verifyFee);
router.get("/admin/fees",authMiddleware, authRoleAdmin, listAllFees);
router.get("/fees/me",authMiddleware, authRoleProvider, myFees);


export default feesRoutes; 
