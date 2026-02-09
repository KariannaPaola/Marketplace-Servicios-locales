/**
 * Modelo de Archivos (Files).
 *
 * Este módulo define la estructura de datos para los archivos subidos por los usuarios.
 *
 * Campos:
 * - sender_Id: referencia al usuario que sube los archivos (obligatorio)
 * - type: tipo de archivo, uno de ["cedula", "fotoDeFrente"] (obligatorio)
 * - files: arreglo de objetos que contienen:
 *    - filename: nombre del archivo
 *    - path: ruta en el servidor o almacenamiento
 *    - url: URL pública para acceder al archivo
 *
 * Reglas y consideraciones:
 * - `type` solo puede ser "cedula" o "fotoDeFrente"
 * - `files` puede contener múltiples archivos asociados al mismo tipo
 * - `timestamps: true` agrega automáticamente `createdAt` y `updatedAt`
 * - `sender_Id` es una referencia al modelo `User`
 *
 * Dependencias:
 * - mongoose
 *
 * Uso típico:
 *   import File from './files.model.js';
 *   const nuevoArchivo = await File.create({
 *     sender_Id: userId,
 *     type: "cedula",
 *     files: [{ filename: "cedula.jpg", path: "/uploads/cedula.jpg", url: "https://example.com/uploads/cedula.jpg" }]
 *   });
 *
 * @module File
 */

import mongoose from "mongoose";

const filesSchema= new mongoose.Schema({
  sender_Id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  type: {
      type: String,
      enum: ["cedula", "fotoDeFrente"],
      required: true
    },
  files: [
    {
      filename: String,
      path: String,
      url: String
    }
  ],
},
{timestamps:true} 
)

const File=mongoose.model("file", filesSchema)
export default File;