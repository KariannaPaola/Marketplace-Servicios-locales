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