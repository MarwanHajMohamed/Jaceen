import asyncHandler from "express-async-handler";
import { Product } from "../models/";
import { Response, Request, } from "../types/";

/**
 * Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          } as any,
        }
      : {};
  
    const products = await Product.find({ ...keyword });
  
    res.json({ products });
});

/**
 * Fetch products by slug
 * @route GET /api/products/:slug
 * @access Public
 */
const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

/**
 * Add new product
 * @route POST /api/products
 * @access Public
 */
const addProduct = async(req, res) => {
  try {
    const {
      user,
      name,
      price,
      category,
      imgs,
      description,
      why_jaceen,
      how_to_use,
      product_highlights,
      ingredients,
      countInStock,
    } = req.body;

    // Validate required fields
    if (!user || !name || !price || !category || !imgs?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new product
    const product = new Product({
      user,
      name,
      price,
      category,
      imgs,
      description,
      why_jaceen,
      how_to_use,
      product_highlights,
      ingredients,
      countInStock,
    });

    // Save to database
    const createdProduct = await product.save();

    // Return response
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export {
  getProducts,
  getProductBySlug,
  addProduct
};