import { JSX } from "react";

export interface ProductContext {
  id: number;
  title: string;
  price: number;
  category: string;
  imgs: string[];
  description: JSX.Element | undefined;
  why_jaceen: JSX.Element | undefined;
  how_to_use: JSX.Element | undefined;
  product_highlights: JSX.Element | undefined;
  ingredients: JSX.Element | undefined;
  reviews: string[] | undefined;
}
