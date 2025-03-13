import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ensures errors can be handled where called
  }
};

export const getProductBySlug = async (slug: string) => {
    try {
      const response = await axios.get(`${API_URL}/${encodeURIComponent(slug)}`);
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
