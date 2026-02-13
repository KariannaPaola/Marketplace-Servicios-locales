/**
 * Rutas de la API para la gestión de reseñas (reviews).
 *
 * Este módulo permite manejar reseñas dentro del sistema, incluyendo:
 *
 * ─ Creación de reseñas
 *   • POST /reviews/:requestId
 *     Crea una reseña asociada a una solicitud completada.
 *     Requiere autenticación y rol de cliente.
 *
 * ─ Consulta de reseñas públicas
 *   • GET /reviews/provider/:providerId
 *     Obtiene todas las reseñas públicas de un proveedor.
 *
 * ─ Administración de reseñas
 *   • GET /admin/reviews/:providerId
 *     Obtiene todas las reseñas de un proveedor (panel de administración).
 *     Requiere autenticación y rol de administrador.
 *
 *   • GET /admin/reviews/provider/reported/:providerId
 *     Obtiene todas las reseñas reportadas de un proveedor.
 *     Requiere autenticación y rol de administrador.
 *
 *   • PATCH /admin/reviews/:idReview/verify-report
 *     Verifica o modera una reseña reportada.
 *     Requiere autenticación y rol de administrador.
 *
 * ─ Reporte de reseñas
 *   • PATCH /reviews/:id/report
 *     Permite a un usuario reportar una reseña.
 *     Requiere autenticación.
 *
 * Middlewares utilizados:
 *   • authMiddleware   → Verifica que el usuario esté autenticado
 *   • authRoleClient   → Verifica rol de cliente
 *   • authRoleAdmin    → Verifica rol de administrador
 *
 * @module ReviewRoutes
 */

import { createReview, getReviews, getReviewsAdmin, getReviewsReported, reportReview, verifyReviewsReportedAdmin } from "../controllers/review.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleClient, authRoleAdmin } from "../middlewares/role.js";

const router = Router();

router.post("/reviews/:requestId",authMiddleware, authRoleClient, createReview);
router.get('/reviews/provider/:providerId',getReviews);
router.get('admin/reviews/:providerId', authMiddleware,authRoleAdmin, getReviewsAdmin);
router.get('admin/reviews/provider/reported/:providerId', authMiddleware,authRoleAdmin, getReviewsReported);
router.patch('/reviews/:id/report', authMiddleware, reportReview);
router.patch('admin/reviews/:idReview/verify-report', authMiddleware, authRoleAdmin, verifyReviewsReportedAdmin);

export default router; 