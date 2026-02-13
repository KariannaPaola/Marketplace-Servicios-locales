/**
 * Rutas de la API para la gestión de proveedores.
 *
 * Este módulo define todas las rutas relacionadas con el ciclo de vida
 * y administración de proveedores dentro del sistema.
 *
 * Funcionalidades incluidas:
 *
 * ─ Registro y perfil del proveedor
 *   • POST   /register
 *     Registra un nuevo proveedor (requiere autenticación).
 *
 *   • PATCH  /editProfile
 *     Edita el perfil del proveedor autenticado.
 *
 *   • GET    /me
 *     Obtiene el perfil del proveedor autenticado.
 *
 *   • DELETE /deleteProfile/me
 *     Elimina el perfil del proveedor autenticado.
 *
 * ─ Consulta de proveedores
 *   • GET    /
 *     Obtiene todos los proveedores (requiere autenticación y validación de fees).
 *
 *   • GET    /providersPublic
 *     Obtiene la lista pública de proveedores (sin autenticación).
 *
 *   • GET    /:id
 *     Obtiene el perfil de un proveedor por ID
 *     (requiere autenticación y validación de fees).
 *
 * ─ Administración de proveedores (ADMIN)
 *   • GET    /admin/providers
 *     Obtiene todos los proveedores desde el panel de administración.
 *
 *   • PATCH  /admin/approve/:id
 *     Aprueba un proveedor específico.
 *
 *   • PATCH  /admin/disapprove/:id
 *     Desaprueba un proveedor específico.
 *
 * Middlewares utilizados:
 *   • authMiddleware            → Verifica autenticación
 *   • authRoleAdmin             → Verifica rol administrador
 *   • authCheckProviderFees     → Verifica estado de pagos del proveedor
 *
 * @module ProviderRoutes
 */

import { registerProvider, editProfileProvider, readMyProfileProvider, readProfileProvider, getProviders, getProvidersAdmin, approveProvider, disapproveProvider, deletedMyProfileProvider, getProvidersPublic} from "../controllers/provider.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleAdmin } from "../middlewares/role.js";
import { authCheckProviderFees } from "../middlewares/checkProviderFees.js";


const router = Router();

router.get('/providersPublic', getProvidersPublic);
router.post("/register",authMiddleware, registerProvider);
router.patch("/editProfile", authMiddleware, editProfileProvider);
router.get("/me",authMiddleware, readMyProfileProvider);
router.get("/:id", authCheckProviderFees, authMiddleware, readProfileProvider);
router.delete("/deleteProfile/me",authMiddleware, deletedMyProfileProvider);

router.get('/', authCheckProviderFees, authMiddleware, getProviders);
router.get('/admin/providers',authMiddleware, authRoleAdmin, getProvidersAdmin);
router.patch('/admin/approve/:id', authMiddleware,authRoleAdmin, approveProvider);
router.patch('/admin/disapprove/:id', authMiddleware,authRoleAdmin, disapproveProvider);



export default router;