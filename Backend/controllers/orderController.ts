import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "../types/express";
import Order from "../models/orderModel";

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
  }[];
  shippingAddress: {
    street: string;
    city: string;
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

export { createOrder };
