import express from "express";
import {
  addProduct,
    getProductBySlug,
// Get all products
  getProducts,

} from "../controllers/productController";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/").post(addProduct);
router.route("/:slug").get(getProductBySlug);

export default router;