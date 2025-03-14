import axios from "axios";
import { CartItem } from "../Context/CartInterface";

const API_URL = "http://localhost:4000";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${encodeURIComponent(slug)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const getProductByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const handleCheckout = async (cartItems: CartItem[], discountCode: string) => {
  const response = await axios.post(`${API_URL}/api/cart/checkout`, {
    cartItems: cartItems,
    couponCode: discountCode
  });

  console.log(response.data);
};
