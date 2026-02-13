/**
 * Rutas de Tarifas / Pagos (Fee Routes).
 *
 * Este módulo define los endpoints relacionados con el registro,
 * validación y administración de pagos o cuotas dentro del sistema.
 *
 * Endpoints:
 *
 * - POST /:id/pay
 *   Registra el pago de una tarifa asociada a un recurso específico.
 *
 *   Parámetros:
 *     - id: identificador de la tarifa o entidad asociada al pago
 *
 *   Requiere autenticación.
 *   Middleware:
 *     - authMiddleware
 *
 *   Controlador:
 *     - paymentRegister
 *
 * - PATCH /:id/approve
 *   Aprueba una tarifa o pago registrado.
 *
 *   Parámetros:
 *     - id: identificador de la tarifa
 *
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *
 *   Controlador:
 *     - approveFee
 *
 * - PATCH /:id/disapprove
 *   Rechaza o desaprueba una tarifa o pago registrado.
 *
 *   Parámetros:
 *     - id: identificador de la tarifa
 *
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *
 *   Controlador:
 *     - disapproveFee
 *
 * - GET /admin/fees
 *   Obtiene el listado completo de tarifas para administración.
 *
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *
 *   Controlador:
 *     - listAllFees
 *
 * - GET /fees/me
 *   Obtiene las tarifas asociadas al usuario autenticado.
 *
 *   Requiere autenticación.
 *   Middleware:
 *     - authMiddleware
 *
 *   Controlador:
 *     - myFees
 *
 * - GET /admin/fee/:id
 *   Verifica o consulta el detalle de una tarifa específica
 *   (por ejemplo, validación de referencia de pago).
 *
 *   Parámetros:
 *     - id: identificador de la tarifa
 *
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *
 *   Controlador:
 *     - verifyReference
 *
 * Middlewares:
 * - authMiddleware: valida autenticación del usuario.
 * - authRoleAdmin: verifica que el usuario tenga permisos de administrador.
 *
 * Dependencias:
 * - express (Router)
 * - fee.controller.js
 * - middlewares de autenticación y autorización
 *
 * Uso típico:
 *   import feeRoutes from './routes/fee.routes.js';
 *   app.use('/api/fees', feeRoutes);
 *
 * @module FeeRoutes
 */

import { paymentRegister, disapproveFee, approveFee, listAllFees, myFees, verifyReference } from "../controllers/fee.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import {  authRoleAdmin } from "../middlewares/role.js";

const router = Router();

router.post("/:id/pay",authMiddleware, paymentRegister);
router.patch("/:id/approve",authMiddleware, authRoleAdmin, approveFee);
router.patch("/:id/disapprove",authMiddleware, authRoleAdmin, disapproveFee);
router.get("/admin/fees",authMiddleware, authRoleAdmin, listAllFees);
router.get("/fees/me",authMiddleware, myFees);
router.get("/admin/fee/:id",authMiddleware, authRoleAdmin, verifyReference);


export default router; 
