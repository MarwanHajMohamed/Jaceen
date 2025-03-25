import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  transactionId: string;
  amount: number;
  status: "Success" | "Failed";
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Success", "Failed"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
