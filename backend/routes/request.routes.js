import { pendingRequest, formRequest, cancelRequest, completeRequest, getRequestProvider, getRequestClient} from "../controllers/request.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleClient } from "../middlewares/role.js";
import { authCheckProviderFees } from "../middlewares/checkProviderFees.js";
const router = Router();

router.patch("/pending/:id",authMiddleware, authCheckProviderFees, pendingRequest);
router.patch("/requests/:Id_request",authMiddleware, formRequest);
router.patch('/:id/cancel', authMiddleware, cancelRequest);
router.patch('/:id/complete', authMiddleware, completeRequest); 
router.get('/provider/getrequests', authMiddleware, getRequestProvider);
router.get('/client/getrequests', authMiddleware, getRequestClient);
export default router; 