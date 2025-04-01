import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/constants";

export interface Address {
  country: string;
  city: string;
  street: string;
  postcode: string;
  apartment?: string;
  county?: string;
}

export interface User {
  _id: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber?: string;
  shippingAddress: Address;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Logout method
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data); // This should update the state
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError("Failed to fetch user details");
        setIsLoading(false);
        logout();
      }
    };

    fetchUserDetails();
  }, []); // Ensures the fetch runs only once on mount

  // Method to update user details
  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  return {
    user,
    isLoading,
    error,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };
}
