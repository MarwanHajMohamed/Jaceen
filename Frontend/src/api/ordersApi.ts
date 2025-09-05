import axios from "axios";
import { CreateOrderRequest } from "../Context/Order";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:5001";

// CREATE ORDER
export const createOrder = async (orderData: CreateOrderRequest) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(`${API_URL}/api/orders`, orderData, {
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
          "x-auth-token": token,
        }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || "Failed to create order";
      throw new Error(errorMessage);
    }

    throw error;
  }
};

// GET ORDERS BY USER
export const fetchOrders = async () => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`${API_URL}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching orders: ", error);
  }
};
