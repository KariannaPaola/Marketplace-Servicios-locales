/**
 * Rutas de la API para la gestión de solicitudes (requests).
 *
 * Este módulo maneja el ciclo de vida de una solicitud entre cliente y proveedor:
 *
 * ─ Estados y acciones sobre solicitudes
 *   • PATCH /pending/:id
 *     Cambia el estado de una solicitud a "pendiente".
 *
 *   • PATCH /requests/:Id_request
 *     Confirma o formaliza una solicitud existente.
 *
 *   • PATCH /:id/cancel
 *     Cancela una solicitud existente.
 *
 *   • PATCH /:id/complete
 *     Marca una solicitud como completada.
 *
 * ─ Consultas de solicitudes
 *   • GET /provider/getrequests
 *     Obtiene todas las solicitudes asociadas al proveedor autenticado.
 *
 *   • GET /client/getrequests
 *     Obtiene todas las solicitudes asociadas al cliente autenticado.
 *
 * Middlewares utilizados:
 *   • authMiddleware          → Verifica que el usuario esté autenticado
 *   • authRoleClient          → Verifica que el usuario sea cliente (cuando aplica)
 *   • authCheckProviderFees   → Verifica que el proveedor tenga pagos al día (cuando aplica)
 *
 * @module RequestRoutes
 */
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