import asyncHandler from "express-async-handler";
import { Product } from "../models/";
import { Response, Request, } from "../types/";
/**
 * Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
  
    // Get search keyword from request and search for partial match
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          } as any,
        }
      : {};
  
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  });

  // productController.js
const getProductByName = async (req, res) => {
    const { name } = req.params; // Extract 'name' from the URL parameter
    try {
      const product = await Product.findOne({ name }); // Query the database for the product by name
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
    getProductByName
  };