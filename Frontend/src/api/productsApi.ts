import axios from "axios";
import { ProductContext } from "../Context/Product";

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
  