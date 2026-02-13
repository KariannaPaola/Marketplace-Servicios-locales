/**
 * Rutas de la API para la gestión de usuarios.
 *
 * Este módulo permite a los administradores:
 *
 * ─ Consultar usuarios
 *   • GET /admin/users
 *     Obtiene todos los usuarios del sistema.
 *
 *   • GET /admin/user/:id
 *     Obtiene la información de un usuario específico por ID.
 *
 * ─ Modificar estado de usuarios
 *   • DELETE /:id
 *     Elimina un usuario (marcado como inactivo o borrado lógico).
 *
 *   • PATCH /restore/:id
 *     Restaura un usuario previamente eliminado.
 *
 * Todas las rutas requieren:
 *   • authMiddleware → Verifica que el usuario esté autenticado
 *   • authRoleAdmin → Verifica que el usuario tenga rol de administrador
 *
 * @module UsersRoutes
 */

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
