import express from "express";
import {
    getProductBySlug,
// Get all products
  getProducts,

} from "../controllers/productController";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:slug").get(getProductBySlug);

export default router;