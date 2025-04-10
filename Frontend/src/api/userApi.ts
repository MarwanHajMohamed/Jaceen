import axios from "axios";
import { Address, User } from '../types/user'

const API_URL = import.meta.env.VITE_API_URL;

// HANDLE REGISTER
export const handleRegister = async (
  user: User
): Promise<"success" | "duplicate" | undefined> => {
  try {
    user.shippingAddress = user.shippingAddress || {
      street: "",
      city: "",
      postcode: "",
      country: "",
    };
    user.phone = "";
    await axios.post(`${API_URL}/api/users`, user);
    return "success";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "User already exists"
        ) {
          console.error("User already exists. Please try a different email.");
          return "duplicate";
        } else {
          console.error(
            `Error: ${error.response.data.message || "Unknown error"}`
          );
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
export const handleLogin = async (
  email: string,
  password: string
): Promise<"success" | undefined> => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password },
      { withCredentials: true }
    );

    if (response.data) {
      const token = response.data.token;

      if (token) {
        localStorage.setItem("authToken", token);
      }
    }

    return "success";
  } catch (error) {
    console.log(error);
  }
};

// UPDATE USER ADDRESS
export const updateAddress = async (addressData: Address) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.put(
      `${API_URL}/api/users/address`,
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

// UPDATE LOGIN DETAILS
export const updateLoginDetails = async (userData: User) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.put(`${API_URL}/api/users/details`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};
