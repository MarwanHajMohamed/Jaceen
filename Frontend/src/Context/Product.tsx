import { ObjectId } from "bson";
import { Date } from "mongoose";

export interface reviews {
  productId: ObjectId;
  user: ObjectId;
  title: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
}

export interface ProductContext {
  _id: ObjectId;
  name: string;
  slug: string;
  price: number;
  category: string;
  imgs: string[];
  description: string | undefined;
  why_jaceen: string | undefined;
  how_to_use: string | undefined;
  product_highlights: string | undefined;
  ingredients: string | undefined;
  countInStock: number;
  rating: number;
}
