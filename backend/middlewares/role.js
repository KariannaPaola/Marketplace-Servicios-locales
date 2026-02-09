/**
 * Middleware de autorización por rol de usuario.
 *
 * Este módulo permite:
 * - Restringir el acceso a rutas según el tipo de usuario
 * - Validar que el usuario esté autenticado (`req.user`) antes de comprobar el rol
 *
 * Reglas y consideraciones:
 * - `authRoleClient`: solo permite acceso a usuarios con `user_type` = "cliente"
 * - `authRoleProvider`: solo permite acceso a usuarios con `user_type` = "proveedor"
 * - `authRoleAdmin`: solo permite acceso a usuarios con `user_type` = "administrador"
 * - Si el usuario no está autenticado, retorna 401
 * - Si el usuario no tiene el rol requerido, retorna 403
 *
 * Dependencias:
 * - Variables de entorno cargadas con dotenv
 * - Se asume que `req.user` ya fue definido por un middleware de autenticación previo
 *
 * Uso típico en Express:
 *   import { authRoleClient, authRoleProvider, authRoleAdmin } from './roles.middleware.js';
 *   app.get('/ruta-cliente', authRoleClient, controladorCliente);
 *   app.get('/ruta-proveedor', authRoleProvider, controladorProveedor);
 *   app.get('/ruta-admin', authRoleAdmin, controladorAdmin);
 *
 * @module rolesMiddleware
 */

import dotenv from 'dotenv';
dotenv.config();

export const authRoleClient = (req, res, next) => {
  const user= req.user;
  if (!user) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  if (user.user_type !== 'cliente') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol cliente' });
  }
  next();
};

export const authRoleProvider = (req, res, next) => {
  const user= req.user;
  if (!user) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  if (user.user_type !== 'proveedor') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol proveedor' });
  }
  next();
};

export const authRoleAdmin = (req, res, next) => {
  const user= req.user;
  if (!user) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  if (user.user_type !== 'administrador') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol administrador' });
  }
  next();
};

