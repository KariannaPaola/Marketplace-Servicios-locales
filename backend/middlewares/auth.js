/**
 * Middleware de autenticación basado en JWT.
 *
 * Este módulo permite:
 * - Verificar que la petición contenga un token JWT válido en el header `Authorization`
 * - Validar que el usuario asociado al token exista en la base de datos
 * - Adjuntar la información del usuario a `req.user` para su uso en controladores posteriores
 *
 * Reglas y consideraciones:
 * - El token debe enviarse en el header `Authorization` con el formato: "Bearer <token>"
 * - Si el token no se envía o es inválido, la respuesta será 401 (No autorizado)
 * - El token se valida usando la clave secreta definida en `process.env.JWT_SECRET`
 *
 * Dependencias:
 * - Modelo User (MongoDB / Mongoose)
 * - Paquete jsonwebtoken
 *
 * Uso típico en Express:
 *   import authMiddleware from './auth.middleware.js';
 *   app.get('/ruta-protegida', authMiddleware, controlador);
 *
 * @module authMiddleware
 */

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No autorizado, token no enviado" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: 'No hay token, acceso denegado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "Usuario no válido" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

export default authMiddleware;