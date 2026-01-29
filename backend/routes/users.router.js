import { getUsers, getUsersId, deleteUser, unDeleteUser} from "../controllers/users.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleAdmin } from "../middlewares/role.js";

const router = Router();

router.get("/admin/users",authMiddleware, authRoleAdmin, getUsers);
router.get("/admin/user/:id",authMiddleware, authRoleAdmin, getUsersId);
router.delete('/:id', authMiddleware,authRoleAdmin, deleteUser);
router.patch('/restore/:id', authMiddleware,authRoleAdmin, unDeleteUser);

export default router; 
