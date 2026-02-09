/**
 * Controladores para la gestión de archivos e imágenes.
 *
 * Este módulo permite:
 * - Subir imágenes usando Multer y almacenarlas en el servidor
 * - Registrar la información del archivo en la base de datos
 * - Generar URLs públicas para acceder a los archivos subidos
 * - Obtener imágenes asociadas a un usuario específico
 *
 * Reglas y consideraciones:
 * - Se requiere un archivo en `req.file`
 * - Los archivos se almacenan en `/uploads/documents`
 * - Cada archivo se asocia al usuario autenticado
 *
 * Dependencias:
 * - Modelo File (MongoDB / Mongoose)
 *
 * Uso típico en Express:
 *   import { uploadImage, readImage } from "./files.controller.js";
 *
 * @module filesController
 */

import File from '../models/files.models.js';

export const uploadImage = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se han subido archivos.' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/documents/${req.file.filename}`;
    const document = new File({
      sender_Id: req.user.id,   
      type: req.body.type,      
      files: [{
        filename: req.file.filename,
        path: req.file.path,
        type: req.file.mimetype,
        url: fileUrl 
      }]
    });         
    await document.save();
    res.json({ message: "Documentos subidos correctamente" });
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error al subir los archivos.', error: error.message });
  }

}

export const readImage = async (req, res) => {
  const {id} =  req.params;
  const documents = await File.find({ sender_Id: id});
  res.json(documents);
}