export interface CheckoutRequestBody {
    cartItems: Array<{
      name: string;
      price: number;
      quantity: number;
    }>;
    couponCode?: string;
  }
