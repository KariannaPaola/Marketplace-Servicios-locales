/**
 * Rutas de Archivos e Imágenes (Files Routes).
 *
 * Este módulo define los endpoints relacionados con la subida y
 * consulta de imágenes y documentos dentro del sistema.
 *
 * Endpoints:
 *
 * - POST /upload
 *   Permite subir un archivo (imagen o documento) al servidor.
 *
 *   Requiere autenticación.
 *   Middlewares:
 *     - authMiddleware: valida que el usuario esté autenticado
 *     - uploadDocs.single('documents'): procesa la subida de un solo archivo con campo 'documents'
 *
 *   Controlador:
 *     - uploadImage
 *
 * - GET /admin/images/:id
 *   Permite leer o descargar una imagen específica del servidor.
 *
 *   Parámetros:
 *     - id: identificador del archivo o imagen
 *
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *
 *   Controlador:
 *     - readImage
 *
 * Reglas y consideraciones:
 * - La subida de archivos se gestiona mediante `multer` configurado en `uploadDocs`.
 * - Solo administradores pueden acceder a la ruta de lectura de imágenes.
 * - La lógica de almacenamiento, validación de tipo de archivo y ruta se maneja en el controlador.
 *
 * Dependencias:
 * - express (Router)
 * - multer (configurado en config/multer.js)
 * - files.controller.js
 * - middlewares de autenticación y rol
 *
 * Uso típico:
 *   import fileRoutes from './routes/files.routes.js';
 *   app.use('/api/files', fileRoutes);
 *
 * @module FilesRoutes
 */

import { uploadImage, readImage } from "../controllers/files.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleAdmin } from "../middlewares/role.js";
import { uploadDocs } from "../config/multer.js";
const router = Router();

router.post("/upload",authMiddleware, uploadDocs.single('documents'), uploadImage);
router.get('/admin/images/:id',authMiddleware, authRoleAdmin, readImage);

export default router;