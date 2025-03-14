import express from "express";
import { checkout } from "../controllers/cartController";

const router = express.Router();

router.post("/checkout", checkout); // ✅ Ensure this endpoint is defined

export default router;