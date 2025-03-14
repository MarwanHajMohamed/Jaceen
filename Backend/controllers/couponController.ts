import { Request, Response } from "express";
import Coupon from "../models/Coupon";

// Create a coupon
export const createCoupon = async (req: Request, res: Response) => {
  const { code, discountType, discountValue, expiryDate, usageLimit } = req.body;

  try {
    const newCoupon = await Coupon.create({
      code: code.toUpperCase(), // Ensure consistency
      discountType,
      discountValue,
      expiryDate,
      usageLimit,
    });

    res.status(201).json({ success: true, coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating coupon" });
  }
};

// Validate a coupon
export const validateCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    if (coupon.timesUsed >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    res.status(200).json({ success: true, discountType: coupon.discountType, discountValue: coupon.discountValue });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error validating coupon" });
  }
};

// Apply coupon to cart total
export const applyCoupon = async (cartTotal: number, couponCode: string) => {
  const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });

  if (!coupon) throw new Error("Invalid coupon");

  if (coupon.expiryDate < new Date()) throw new Error("Coupon expired");

  if (coupon.timesUsed >= coupon.usageLimit) throw new Error("Coupon usage limit reached");

  let discountedTotal = cartTotal;

  if (coupon.discountType === "percentage") {
    discountedTotal = cartTotal - (cartTotal * (coupon.discountValue / 100));
  } else if (coupon.discountType === "fixed") {
    discountedTotal = Math.max(0, cartTotal - coupon.discountValue);
  }

  await Coupon.findByIdAndUpdate(coupon._id, { $inc: { timesUsed: 1 } });

  return discountedTotal;
};
