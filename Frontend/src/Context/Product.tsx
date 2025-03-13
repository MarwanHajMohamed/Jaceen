import { ObjectId } from "bson";

export interface reviews {
  name: string;
  review: string;
  date: string;
  rating: number;
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
  reviews: reviews[];
}
