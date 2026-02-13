/**
 * Rutas de Autenticación (Auth Routes).
 *
 * Este módulo define los endpoints relacionados con la autenticación
 * y gestión de credenciales de los usuarios en el sistema.
 *
 * Endpoints:
 *
 * - POST /register
 *   Registra un nuevo usuario en el sistema.
 *   Controlador: registerUser
 *
 * - POST /login
 *   Autentica a un usuario con sus credenciales (email y contraseña).
 *   Controlador: loginUser
 *
 * - GET /verify-email/:token
 *   Verifica el correo electrónico del usuario mediante un token.
 *   Parámetros:
 *     - token: token de verificación enviado por correo
 *   Controlador: verifyEmail
 *
 * - POST /recover-password
 *   Inicia el proceso de recuperación de contraseña.
 *   Generalmente envía un token de recuperación al correo del usuario.
 *   Controlador: recoverPassword
 *
 * - POST /change-password/:token
 *   Permite establecer una nueva contraseña usando un token válido.
 *   Parámetros:
 *     - token: token de recuperación de contraseña
 *   Controlador: changePassword
 *
 * - GET /me
 *   Retorna la información del usuario autenticado.
 *   Requiere autenticación mediante `authMiddleware`.
 *   Controlador: auth
 *
 * Middlewares:
 * - authMiddleware: protege rutas que requieren autenticación
 *
 * Dependencias:
 * - express (Router)
 * - auth.controller.js
 * - auth middleware
 *
 * Uso típico:
 *   import authRoutes from './routes/auth.routes.js';
 *   app.use('/api/auth', authRoutes);
 *
 * @module AuthRoutes
 */

import {auth, registerUser, loginUser, verifyEmail,  recoverPassword, changePassword } from "../controllers/auth.controller.js";
import { Router } from "express";
const router = Router();
import authMiddleware from "../middlewares/auth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/recover-password", recoverPassword);
router.post("/change-password/:token", changePassword);
router.get("/me",authMiddleware, auth);




export default router;