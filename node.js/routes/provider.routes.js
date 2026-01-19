import { registerProvider, editProfile_Provider, readMyProfile_Provider, readProfile_Provider, readProfile_Provider, getProviders} from "../controllers/provider.controller";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleProvider} from "../middlewares/role.js";
import { authCheckProviderFees } from "../middlewares/checkProviderFees.js";
const router = Router();


router.post("/providers",authMiddleware, registerProvider);
router.patch("/providers/:id",authMiddleware,  authRoleProvider, editProfile_Provider);
router.get("/providers/me",authMiddleware, authRoleProvider, readMyProfile_Provider);
router.get("/providers/:id", authCheckProviderFees,readProfile_Provider);
router.delete("/providers/me",authMiddleware, authRoleProvider, readProfile_Provider);
router.get('/providers', authCheckProviderFees, getProviders);

export default providersRoutes;