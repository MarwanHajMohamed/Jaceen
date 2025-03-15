import axios from "axios";
import { CartItem } from "../Context/CartInterface";
import {User} from '../../../Backend/types/user'

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

export const handleRegister = async (user: User) => {
  try {
    const response = await axios.post(`${API_URL}/api/users`, user);
    console.log(response.data);
    return "success"
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === "User already exists") {
          console.error("User already exists. Please try a different email.");
          return ("duplicate")
        } else {
          console.error(`Error: ${error.response.data.message || "Unknown error"}`);
        }
      } else if (error.request) {
        console.error("Network error. Please try again later.");
      } else {
        console.error(`Unexpected error: ${error.message}`);
      }
    } else {
      console.error(`Error: ${error}`);
    }
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, {email, password});
    console.log(response.data);
    return "success"
  } catch (error) {
    console.log(error);
    
  }
};
