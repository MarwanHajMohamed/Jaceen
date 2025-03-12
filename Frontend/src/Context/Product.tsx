import { JSX } from "react";

export interface reviews {
  name: string;
  review: string;
  date: string;
  rating: number;
}

export interface ProductContext {
  id: number;
  name: string;
  price: number;
  category: string;
  imgs: string[];
  description: JSX.Element | undefined;
  why_jaceen: JSX.Element | undefined;
  how_to_use: JSX.Element | undefined;
  product_highlights: JSX.Element | undefined;
  ingredients: JSX.Element | undefined;
  reviews: reviews[];
}
