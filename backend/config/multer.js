/**
 * Middleware de carga de archivos usando Multer.
 *
 * Este módulo:
 * - Configura almacenamiento en disco para archivos subidos
 * - Define un directorio de destino para documentos/imágenes
 * - Crea el directorio automáticamente si no existe
 * - Genera nombres de archivo únicos basados en timestamp
 * - Restringe la subida solo a archivos de tipo imagen
 * - Limita el tamaño máximo del archivo a 2MB
 *
 * Directorio de subida:
 *   /uploads/documents
 *
 * Uso típico en Express:
 *   import { uploadDocs } from "./uploadDocs.js";
 *   app.post("/upload", uploadDocs.single("file"), controller);
 *
 * @module uploadDocs
 */

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname,'..', 'uploads', 'documents');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext); 
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Solo se permiten imágenes'), false);
  }
  cb(null, true);
};

export const uploadDocs = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});
