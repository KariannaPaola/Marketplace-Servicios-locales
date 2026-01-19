import { createReview, getReviews, getReviewsAdmin, getReviewsReported, reportReview, verifyReviewsReportedAdmin } from "../controllers/review.controller";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { authRoleClient, authRoleAdmin } from "../middlewares/role.js";
i
const router = Router();

router.post("/reviews/:requestId",authMiddleware, authRoleClient, createReview);
router.get('/reviews/provider/:providerId',getReviews);
router.get('admin/reviews/:providerId', authMiddleware,authRoleAdmin, getReviewsAdmin);
router.get('admin/reviews/provider/reported/:providerId', authMiddleware,authRoleAdmin, getReviewsReported);
router.patch('/reviews/:id/report', authMiddleware, reportReview);
router.patch('admin/reviews/:idReview/verify-report', authMiddleware, authRoleAdmin, verifyReviewsReportedAdmin);

export default reviewsRoutes; 