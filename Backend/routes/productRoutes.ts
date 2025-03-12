import express from "express";
import {
    getProductByName,
// Get all products
  getProducts,

} from "../controllers/productController";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:name").get(getProductByName);

export default router;