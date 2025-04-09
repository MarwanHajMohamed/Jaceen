import asyncHandler from "express-async-handler";
import { Product } from "../models/";
import { Response, Request } from "../types/express";

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
 * Fetch products by category
 * @route GET /api/products/category/:category
 * @access Public
 */
const getProductByCategory = async (req, res) => {
  const { category } = req.params; // Get category from URL parameter

  try {
    // Find products that match the category
    const products = await Product.find({ category: category });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    // Return the found products
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products by category", error });
  }
};


/**
 * Fetch categories
 * @route GET /api/categories
 * @access Public
 */
const getCategories = async (req, res) => {
  try {
    const products = await Product.find().select("category");

    // Extract unique categories using a Set
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    // Send back the unique categories as the response
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Add new product
 * @route POST /api/products
 * @access Public
 */
const addProduct = async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Unauthorised to create product." });
  }

  try {
    const {
      name,
      price,
      category,
      slug,
      imgs,
      description,
      why_jaceen,
      how_to_use,
      product_highlights,
      ingredients,
      countInStock,
    } = req.body;

    console.log("Request body: ", req.body);

    // Validate required fields
    if (!name || !price || !category || !slug || !countInStock) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create new product
    const product = new Product({
      name,
      slug,
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
};

export { getProducts, getProductBySlug, getProductByCategory, addProduct, getCategories };
