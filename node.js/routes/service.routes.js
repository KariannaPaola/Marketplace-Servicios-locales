import { createService, editService, deleteService} from "../controllers/service.controller.js";

import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleProvider} from "../middlewares/role.js";
const router = Router();


router.post("/providers/me/services",authMiddleware, authRoleProvider, createService);
router.patch("/providers/me/services/:id",authMiddleware, authRoleProvider, editService);
router.delete("/providers/me/services/:id",authMiddleware, authRoleProvider, deleteService);

export default servicesRoutes;