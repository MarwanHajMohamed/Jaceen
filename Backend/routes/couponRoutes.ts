import express from "express";
import { createCoupon, validateCoupon } from "../controllers/couponController";

const router = express.Router();

router.post("/create", createCoupon);     // Admin creates a coupon
router.post("/validate", validateCoupon); // Users validate coupons before checkout

export default router;