import { ObjectId } from "bson";

// Define the types for the cart item
export interface CartItem {
  _id: ObjectId;
  img: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
}

// Define the context type
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}
