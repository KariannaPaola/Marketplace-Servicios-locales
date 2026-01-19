import { createRequest, formRequest, cancelRequest, completeRequest} from "../controllers/request.controller";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleClient } from "../middlewares/role.js";
import { authCheckProviderFees } from "../middlewares/checkProviderFees.js";
const router = Router();

router.post("/requests",authMiddleware, authRoleClient, authCheckProviderFees, createRequest);
router.patch("/requests/:id/confirm",authMiddleware, authRoleClient, formRequest);
router.patch('/requests/:id/cancel', authMiddleware, cancelRequest);
router.patch('/requests/:id/complete', authMiddleware, completeRequest);

export default requestRoutes; 