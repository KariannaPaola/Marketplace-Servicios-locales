import { createCategory, getCategories, getCategoriesAdmin, editCategory, deleteCategory } from "../controllers/category.controller";

router.post("/categories",authMiddleware,authRoleAdmin, createCategory);
router.get('/categories', getCategories);
router.get('/admin/categories', authMiddleware,authRoleAdmin, getCategoriesAdmin);
router.patch('/categories/:id', authMiddleware, authRoleAdmin, editCategory);
router.delete("/categories/:id ",authMiddleware, authRoleAdmin, deleteCategory);

export default categoriesRoutes; 