import axios from "axios";
import { CartItem } from "../Context/CartInterface";
import { API_URL } from "../config/constants";

// HANDLE CHECKOUT
export const handleCheckout = async (cartItems: CartItem[], discountCode: string): Promise<void> => {
  await axios.post(`${API_URL}/api/cart/checkout`, {
    cartItems: cartItems,
    couponCode: discountCode
  });

};

// HANDLE PAYMENT
interface PaymentResponse {
  messages: {
    resultCode: string;
    message: {
      text: string;
    }[];
  };
  opaqueData?: {
    dataValue: string;
  };
}

// PROCESS PAYMENT
export const processPayment = async (response: PaymentResponse, totalAmount: number) => {
  if (!response.opaqueData?.dataValue) {
    throw new Error('Payment token is missing.');
  }

  try {
    const requestData = {
      paymentToken: response.opaqueData.dataValue,
      amount: totalAmount
    };

    const res = await fetch(`${API_URL}/api/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Payment processing failed: ${errorData.error || res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};
