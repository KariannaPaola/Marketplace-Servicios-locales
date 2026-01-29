import { registerProvider, editProfileProvider, readMyProfileProvider, readProfileProvider, getProviders, getProvidersAdmin, approveProvider, disapproveProvider} from "../controllers/provider.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleProvider} from "../middlewares/role.js";
import { authRoleAdmin } from "../middlewares/role.js";
import { authCheckProviderFees } from "../middlewares/checkProviderFees.js";

const router = Router();


router.post("/register",authMiddleware, registerProvider);
router.patch("/providers/:id",authMiddleware,  authRoleProvider, editProfileProvider);
router.get("/providers/me",authMiddleware, authRoleProvider, readMyProfileProvider);
router.get("/:id", authCheckProviderFees, authMiddleware, readProfileProvider);
router.delete("/providers/me",authMiddleware, authRoleProvider, readProfileProvider);
router.get('/', authCheckProviderFees, authMiddleware, getProviders);
router.get('/providersPublic', getProviders);
router.get('/admin/providers',authMiddleware, authRoleAdmin, getProvidersAdmin);
router.patch('/admin/approve/:id', authMiddleware,authRoleAdmin, approveProvider);
router.patch('/admin/disapprove/:id', authMiddleware,authRoleAdmin, disapproveProvider);


export default router;