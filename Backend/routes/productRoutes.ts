import express from "express";
import {
  addProduct,
  getCategories,
  getProductByCategory,
  getProductById,
  getProductBySlug,
  // Get all products
  getProducts,
} from "../controllers/productController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products").post(protect, admin, addProduct);
router.route("/category/:category").get(getProductByCategory);
router.route("/products/slug/:slug").get(getProductBySlug);
router.route("/products/id/:id").get(getProductById);
router.route("/categories").get(getCategories);

export default router;
