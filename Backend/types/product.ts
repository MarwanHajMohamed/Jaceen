import { Model, Document } from "mongoose";

/**
 * Represents a product
 */
export interface Product {
    name: string;
    price: number;
    category: string;
    imgs: string[];
    description: Element | undefined;
    why_jaceen: Element | undefined;
    how_to_use: Element | undefined;
    product_highlights: Element | undefined;
    ingredients: Element | undefined;
    countInStock: number;
    numReviews: number;
    rating: number;
}

/**
 * Represents a product w/ reviews
 */
interface ProductInDatabase extends Product {
  user: string;
}

export interface ProductDocument extends ProductInDatabase, Document {}

export interface ProductModel extends Model<ProductDocument> {}