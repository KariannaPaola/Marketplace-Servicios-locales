import { paymentRegister, disapproveFee, approveFee, listAllFees, myFees } from "../controllers/fee.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import {  authRoleAdmin } from "../middlewares/role.js";

const router = Router();

router.post("/fees/:id/pay",authMiddleware, paymentRegister);
router.patch("/:id/approve",authMiddleware, authRoleAdmin, approveFee);
router.patch("/:id/disapprove",authMiddleware, authRoleAdmin, disapproveFee);
router.get("/admin/fees",authMiddleware, authRoleAdmin, listAllFees);
router.get("/fees/me",authMiddleware, myFees);


export default router; 
