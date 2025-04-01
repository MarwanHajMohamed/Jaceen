import axios from "axios";
import { CartItem } from "../Context/CartInterface";
import { Address, User } from '../../../Backend/types/user'
import { ObjectId } from "bson";
import { ProductContext } from "../Context/Product";
import { CreateOrderRequest } from "../Context/Order";
import { API_URL } from "../config/constants";

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
    user.shippingAddress = user.shippingAddress || { street: "", city: "", postcode: "", country: "" };
    await axios.post(`${API_URL}/api/users`, user);
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

// ADD REVIEW
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
      { rating, title, comment },
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

// CREATE ORDER
export const createOrder = async (orderData: CreateOrderRequest) => {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await axios.post(`${API_URL}/api/orders`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}`,
                        "x-auth-token": token,
                      })
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to create order';
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

// GET ORDERS BY USER
export const fetchOrders = async () => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.get(`${API_URL}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching orders: ', error)
  }
}

// UPDATE USER ADDRESS
export const updateAddress = async (addressData: Address) => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.put(`${API_URL}/api/users/address`, 
      addressData,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
}