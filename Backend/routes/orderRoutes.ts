import express from 'express';
import { createOrder } from '../controllers/orderController';
import { protect, optionalAuth } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @description Create a new order
 * @route POST /api/orders
 * @access Public (both authenticated and guest users)
 */
router.post('/', optionalAuth, createOrder);

export default router;