import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "../types/express";
import Order from "../models/orderModel";
import mongoose from "mongoose";

interface CreateOrderRequest {
  userId?: string;
  guestInfo?: {
    firstName: string;
    surname: string;
    email: string;
    phoneNumber: string;
  };
  totalAmount: number;
  paymentId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    slug: string;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    apartment?: string;
    county?: string;
    postcode: string;
    country: string;
  };
  status: string;
}

/**
 * Create a new order
 * @route POST /api/orders
 * @access Public
 */
const createOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      totalAmount,
      paymentId,
      items,
      shippingAddress,
      status,
      guestInfo,
    } = req.body as CreateOrderRequest;

    const isAuthenticated = req.user !== undefined;

    const userId = isAuthenticated ? req.user._id.toString() : undefined;

    console.log("User from request:", req.user);

    // If authenticated, validate the user can only create orders for themselves
    if (
      isAuthenticated &&
      req.user &&
      userId &&
      req.user._id.toString() !== userId
    ) {
      res
        .status(403)
        .json({ error: "Unauthorized to create order for this user." });
      return;
    }

    // Validate guest order information
    if (!isAuthenticated) {
      if (!guestInfo) {
        res
          .status(400)
          .json({ error: "Guest information is required." });
        return;
      }
    }

    // Create the order
    const newOrder = new Order({
      userId: userId,
      guestInfo: !isAuthenticated ? guestInfo : undefined,
      isGuestOrder: !isAuthenticated,
      totalAmount,
      paymentId,
      items,
      shippingAddress,
      status,
      createdAt: new Date(),
    });

    // Save to database
    const savedOrder = await newOrder.save();

    // Return the created order
    res.status(201).json(savedOrder);
  }
);

/**
 * @desc Fetch orders for the logged-in user
 * @route GET /api/orders
 * @access Private (Requires authentication)
 */
const getOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Convert userId to ObjectId
    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

export { createOrder, getOrders };
