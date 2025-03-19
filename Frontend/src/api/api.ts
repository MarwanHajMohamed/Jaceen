import axios from "axios";
import { CartItem } from "../Context/CartInterface";
import {User} from '../../../Backend/types/user'
import { ObjectId } from "bson";
import { ProductContext } from "../Context/Product";

const API_URL = "http://localhost:4000";

// GET PRODUCTS
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// GET PRODUCTS BY SLUG
export const getProductBySlug = async (slug: string): Promise<ProductContext> => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${encodeURIComponent(slug)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// GET PRODUCTS BY CATEGORY
export const getProductByCategory = async (category: string): Promise<ProductContext> => {
  try {
    const response = await axios.get(`${API_URL}/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// HANDLE CHECKOUT
export const handleCheckout = async (cartItems: CartItem[], discountCode: string): Promise<void> => {
  const response = await axios.post(`${API_URL}/api/cart/checkout`, {
    cartItems: cartItems,
    couponCode: discountCode
  });

  console.log(response.data);
};

// HANDLE REGISTER
export const handleRegister = async (user: User): Promise<"success" | "duplicate" | undefined> => {
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

// HANDLE LOGIN
export const handleLogin = async (email: string, password: string): Promise<"success" | undefined> => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, {email, password},  { withCredentials: true });

    if (response.data) {
      const token = response.data.token;

      if (token) {
        localStorage.setItem('authToken', token);
      }
    }

    return "success";
  } catch (error) {
    console.log(error);
    
  }
};

// GET REVIEWS
export const getReviews = async (productId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${productId}/reviews`);
    
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

interface ReviewResponse {
  message: string;
  review?: {
    product: string;
    user: string;
    name: string;
    rating: number;
    title: string;
    comment: string;
  };
}

export const addReview = async (
  rating: number,
  title: string,
  comment: string,
  productId: ObjectId
): Promise<"missing" | "fail" | "success" | ReviewResponse> => {
  if (rating === 0 || comment === "") {
    return "missing";
  }

  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post<ReviewResponse>(
      `${API_URL}/api/products/${productId.toString()}/reviews`,
      { rating, comment, title },
      {
        headers: {
          Authorization: "Bearer "+ token,
        },
      }
    );

    if (response.data.message === "success") {
      return "success"
    }

    return response.data;
  } catch (error: any) {
    console.error("Error adding review:", error.response?.data || error.message);
    
    return "fail";
  }
};
