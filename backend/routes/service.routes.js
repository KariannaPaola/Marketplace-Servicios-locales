/**
 * Rutas de la API para la gestión de servicios del proveedor.
 *
 * Este módulo permite a los proveedores autenticados:
 *
 * ─ Crear servicios
 *   • POST /providers/me/services
 *     Permite al proveedor crear un nuevo servicio.
 *
 * ─ Editar servicios
 *   • PATCH /providers/me/services/:id
 *     Permite al proveedor editar un servicio existente por ID.
 *
 * ─ Eliminar servicios
 *   • DELETE /providers/me/services/:id
 *     Permite al proveedor eliminar un servicio existente por ID.
 *
 * Todas las rutas requieren:
 *   • authMiddleware → Verifica que el usuario esté autenticado
 *   • authRoleProvider → Verifica que el usuario tenga rol de proveedor
 *
 * @module ServiceRoutes
 */

import { createService, editService, deleteService} from "../controllers/service.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleProvider} from "../middlewares/role.js";
const router = Router();


router.post("/providers/me/services",authMiddleware, authRoleProvider, createService);
router.patch("/providers/me/services/:id",authMiddleware, authRoleProvider, editService);
router.delete("/providers/me/services/:id",authMiddleware, authRoleProvider, deleteService);

export default router;