import { uploadImage, readImage } from "../controllers/files.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleAdmin } from "../middlewares/role.js";
import { uploadDocs } from "../config/multer.js";
const router = Router();

router.post("/upload",authMiddleware, uploadDocs.single('documents'), uploadImage);
router.get('/admin/images/:id',authMiddleware, authRoleAdmin, readImage);

export default router;