/**
 * Rutas de Categorías (Category Routes).
 *
 * Este módulo define los endpoints para la gestión de categorías
 * dentro del sistema. Incluye operaciones públicas y administrativas.
 *
 * Endpoints:
 *
 * - POST /
 *   Crea una nueva categoría.
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *   Controlador: createCategory
 *
 * - GET /categories
 *   Obtiene el listado público de categorías activas.
 *   No requiere autenticación.
 *   Controlador: getCategories
 *
 * - GET /admin/categories
 *   Obtiene el listado completo de categorías para administración.
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *   Controlador: getCategoriesAdmin
 *
 * - PATCH /:id
 *   Edita una categoría existente por su ID.
 *   Parámetros:
 *     - id: identificador de la categoría
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *   Controlador: editCategory
 *
 * - DELETE /:id
 *   Elimina una categoría por su ID.
 *   Parámetros:
 *     - id: identificador de la categoría
 *   Requiere autenticación y rol de administrador.
 *   Middlewares:
 *     - authMiddleware
 *     - authRoleAdmin
 *   Controlador: deleteCategory
 *
 * Middlewares:
 * - authMiddleware: valida autenticación mediante token.
 * - authRoleAdmin: verifica que el usuario tenga rol de administrador.
 *
 * Dependencias:
 * - express Router
 * - category.controller.js
 * - middlewares de autenticación y autorización
 *
 * Uso típico:
 *   import categoryRoutes from './routes/category.routes.js';
 *   app.use('/api', categoryRoutes);
 *
 * @module CategoryRoutes
 */

import { createCategory, getCategories, getCategoriesAdmin, editCategory, deleteCategory } from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.js";
import { authRoleAdmin } from "../middlewares/role.js";
import router from "./review.routes.js";

router.post("/", authMiddleware,authRoleAdmin, createCategory);
router.get('/categories', getCategories);
router.get('/admin/categories', authMiddleware,authRoleAdmin, getCategoriesAdmin);
router.patch('/:id', authMiddleware, authRoleAdmin, editCategory);
router.delete("/:id",authMiddleware, authRoleAdmin, deleteCategory);

export default router; 