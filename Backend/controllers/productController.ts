import asyncHandler from "express-async-handler";
import { Product } from "../models/";
import { Response, Request, } from "../types/";
/**
 * Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    // Get search keyword from request and search for partial match
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          } as any,
        }
      : {};
  
    // Fetch all products that match the keyword
    const products = await Product.find({ ...keyword });
  
    res.json({ products });
});



  // productController.js
const getProductBySlug = async (req, res) => {
    const { slug } = req.params; // Extract 'name' from the URL parameter
    try {
      const product = await Product.findOne({ slug }); // Query the database for the product by name
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product); // Return the product details
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error });
    }
  };
  

  export {
    getProducts,
    getProductBySlug
  };