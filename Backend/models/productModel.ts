import { model, Schema } from "mongoose";
import { ProductDocument } from "../types/";

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    imgs: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
    },
    why_jaceen: {
      type: String,
    },
    how_to_use: {
      type: String,
    },
    product_highlights: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<ProductDocument>("Product", productSchema);