import mongoose, { Schema, Document } from "mongoose";
import { Coupon } from "../types";

const couponSchema = new Schema<Coupon>({
  code: { 
    type: String,
    required: true,
    unique: true
},
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    required: true
},
  discountValue: {
    type: Number,
    required: true
},
  expiryDate: {
    type: Date,
    required: true
},
  usageLimit: {
    type: Number,
    default: 1
},
  timesUsed: {
    type: Number,
    default: 0
}
});

const Coupon = mongoose.model<Coupon>("Coupon", couponSchema);

export default Coupon;
