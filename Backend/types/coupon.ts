export interface Coupon extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: Date;
  usageLimit: number;
  timesUsed: number;
}
  