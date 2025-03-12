// Define the types for the cart item
export interface CartItem {
  id: number;
  img: string;
  name: string;
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
