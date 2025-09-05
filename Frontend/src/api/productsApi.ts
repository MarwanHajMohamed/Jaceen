import axios from "axios";
import { NewProduct, ProductContext } from "../Context/Product";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:5001";

const token = localStorage.getItem("authToken");

// GET PRODUCTS
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// GET PRODUCTS BY SLUG
export const getProductBySlug = async (
  slug: string
): Promise<ProductContext> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/products/${encodeURIComponent(slug)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// GET PRODUCT BY CATEGORY
export const getProductByCategory = async (category: string): Promise<ProductContext[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/category/${encodeURIComponent(category)}`
    );
    return response.data.products; // Ensure the returned data matches the shape
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// GET PRODUCT BY ID
export const getProductById = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

// UPDATE PRODUCT
export const updateProduct = async (id: string, updatedProduct: any) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};


// GET CATEGORIES
export const getCategories = async() => {
  try {
    const response = await axios.get(`${API_URL}/api/categories`)

    console.log(response);

    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// ADD NEW PRODUCT
export const addNewProduct = async (productData: NewProduct, images: File[]) => {
  const uploadedImageUrls: string[] = [];

  for (const image of images) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET!);

    const response = await axios.post(
      import.meta.env.VITE_CLOUDINARY_UPLOAD_URL!,
      formData
    );

    uploadedImageUrls.push(response.data.secure_url);
  }

  return await axios.post(`${API_URL}/api/products`, {
    ...productData,
    imgs: uploadedImageUrls,
  }, {headers: {
    Authorization: `Bearer ${token}`,
  }});
};
