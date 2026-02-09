/**
 * Middleware para encriptar la contraseña del usuario antes de guardarla.
 *
 * Este módulo permite:
 * - Hashear la contraseña usando bcrypt antes de guardar un documento User
 * - Asegurar que la contraseña solo se encripte si fue modificada
 *
 * Reglas y consideraciones:
 * - Se utiliza un salt de 10 rondas para generar el hash
 * - Si la contraseña no ha sido modificada (`isModified("password")`), no se realiza ningún hash
 * - Este middleware se debe ejecutar en el contexto de un documento de Mongoose (`this`)
 * - En caso de error durante el hash, se devuelve el error
 *
 * Dependencias:
 * - Paquete bcryptjs
 *
 * Uso típico en Mongoose:
 *   userSchema.pre('save', bycrytMiddleware);
 *
 * @module bycrytMiddleware
 */

import bcrypt from "bcryptjs";

export async function bycrytMiddleware(next){
  const user = this;
  if (!user.isModified("password")) 
    return 
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    return error;
  }
}