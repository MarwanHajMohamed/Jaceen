import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController';
import { protect, optionalAuth } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @description Create a new order
 * @route POST /api/orders
 * @access Public (both authenticated and guest users)
 */
router.post('/', optionalAuth, createOrder);

/**
 * @desc Get user orders
 * @route GET /api/orders
 * @access Private (Requires authentication)
 */
router.get('/', protect, getOrders);

export default router;