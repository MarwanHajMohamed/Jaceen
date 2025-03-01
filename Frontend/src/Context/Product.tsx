import { JSX } from "react";

export interface ProductContext {
  id: number;
  title: string;
  price: number;
  category: string;
  imgs: string[];
  description: JSX.Element | undefined;
}
