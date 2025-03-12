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

export const getProductByName = async (name: string) => {
    try {
      const response = await axios.get(`${API_URL}/${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

export const createProduct = async (product: {
  name: string;
  price: number;
  category: string;
  description: string;
}) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
