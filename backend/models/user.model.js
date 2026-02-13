/**
 * Modelo de Usuarios (User).
 *
 * Este módulo define la estructura de datos para los usuarios registrados
 * en el sistema, incluyendo clientes, proveedores y administradores.
 *
 * Campos:
 * - name: nombre del usuario (obligatorio, solo letras y caracteres permitidos)
 * - lastname: apellido del usuario (obligatorio, solo letras y caracteres permitidos)
 * - email: correo electrónico único del usuario (obligatorio, validado por regex)
 * - phone_number: número telefónico del usuario (obligatorio, formato venezolano +58...)
 * - user_type: tipo de usuario, uno de
 *   ["cliente", "proveedorPendiente", "proveedor", "administrador"]
 *   (obligatorio, por defecto "cliente")
 * - password: contraseña del usuario (obligatorio, almacenada encriptada)
 * - token_recover_password: token para recuperación de contraseña (opcional)
 * - is_email_verified: indica si el correo ha sido verificado (por defecto false)
 * - token_email: token de verificación de correo electrónico (opcional)
 * - token_email_expires: fecha de expiración del token de verificación (opcional)
 * - updated_by: referencia al usuario que realizó la última actualización (opcional)
 * - is_deleted: indica si el usuario fue eliminado lógicamente (por defecto false)
 * - deleted_at: fecha de eliminación lógica (opcional)
 * - deleted_by: referencia al usuario que realizó la eliminación lógica (opcional)
 *
 * Reglas y consideraciones:
 * - `email` es único dentro del sistema
 * - `name` y `lastname` permiten letras, espacios y ciertos caracteres especiales
 * - `phone_number` está validado para números venezolanos con prefijo +58
 * - `user_type` controla el rol y permisos dentro del sistema
 * - La contraseña se encripta automáticamente mediante el middleware `bycrytMiddleware`
 *   ejecutado en el hook `pre("save")`
 * - Se proporciona el método de instancia `matchPassword(password)`
 *   para comparar contraseñas usando bcrypt
 * - Se implementa eliminación lógica mediante `is_deleted`, `deleted_at` y `deleted_by`
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt`
 *
 * Métodos:
 * - matchPassword(password: string): Promise<boolean>
 *   Compara la contraseña en texto plano con la contraseña encriptada almacenada.
 *
 * Dependencias:
 * - mongoose
 * - bcryptjs
 * - bycrytMiddleware (middleware personalizado para encriptación de contraseñas)
 *
 * Uso típico:
 *   import User from './user.models.js';
 *
 *   const nuevoUsuario = await User.create({
 *     name: "Juan",
 *     lastname: "Pérez",
 *     email: "juan@example.com",
 *     phone_number: "+584121234567",
 *     password: "123456"
 *   });
 *
 *   const isMatch = await nuevoUsuario.matchPassword("123456");
 *
 * @module User
 */

import mongoose from "mongoose";
import { bycrytMiddleware } from "../middlewares/bcrypt.js";
import bcrypt from "bcryptjs";

export const userSchema= new mongoose.Schema({
  name:{
    type: String,
    required: true,
    validate:{
      validator: function (v){
        return /^[A-Za-zñÑáéíóúÁÉÍÓÚ'-\s]+$/.test(v)
      }
    }
  },
  lastname:{
    type: String,
    required: true,
    validate:{
      validator: function (v){
        return /^[A-Za-zñÑáéíóúÁÉÍÓÚ'-\s]+$/.test(v)
      }
    }
  },
  email:{
    type: String,
    unique: true,
    required: true,
    validate:{
      validator: function (v){
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
      }
    }
  },
  phone_number:{
    type: String,
    required: true,
    validate:{
      validator: function (v){
        return /^\+58(212|412|414|424|416|426)[0-9]{7}$/.test(v)
      }
    }
  },
  user_type:{
    type: String,
    enum: {
    values: ["cliente", "proveedorPendiente", "proveedor", "administrador"],
    message: "Tipo de usuario inválido"
  },
    required: true,
    default: "cliente",
  },
  password:{
    type: String,
    required: true,
  },
  token_recover_password:{
    type: String,
    default: null,
  },
  is_email_verified:{
    type: Boolean,
    default: false,
  },
  token_email:{
    type: String
  },
  token_email_expires:{
    type: Date,
    default: null,
  },
  updated_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  is_deleted:{
    type: Boolean,
    default: false,
  },
  deleted_at:{
    type: Date,
    default: null,
  },
  deleted_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
},
{timestamps: true}
)
userSchema.pre("save", bycrytMiddleware);

userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User=mongoose.model("User", userSchema);
export default User;
