import { Schema, model } from "mongoose";

/**
 * Represents a product review
 */
export interface Review {
    product: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    name: string;
    rating: number;
    title: string;
    comment: string;
  }

const reviewSchema = new Schema(
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
      },
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      title: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
const ReviewModel = model<Review>("Review", reviewSchema);

export default ReviewModel;