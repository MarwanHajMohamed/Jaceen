import express from "express";
import { addReviewToProduct, getProductReviews } from "../controllers/reviewController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/:id/reviews", protect, addReviewToProduct);
router.get("/:id/reviews", getProductReviews);

export default router;
