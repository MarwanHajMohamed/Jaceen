import express from "express";
import {
  addProduct,
    getProductBySlug,
// Get all products
  getProducts,

} from "../controllers/productController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/").post(protect, admin, addProduct);
router.route("/:slug").get(getProductBySlug);

export default router;