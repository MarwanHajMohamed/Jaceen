import { useState, useEffect } from "react";
import axios from 'axios';
import { API_URL } from '../config/constants';

export interface User {
  _id: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user details
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      setError('Failed to fetch user details');
      setIsLoading(false);
      // Optionally logout if token is invalid
      logout();
    }
  };

  // Logout method
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  // Fetch user details on component mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Method to update user details
  const updateUser = (updatedUser: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updatedUser } : null);
  };

  return { 
    user, 
    isLoading, 
    error, 
    logout,
    updateUser,
    isAuthenticated: !!user 
  };
}

// Optional login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, {
      email,
      password
    });

    // Assuming the response contains a token and user details
    localStorage.setItem("authToken", response.data.token);
    return response.data.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};