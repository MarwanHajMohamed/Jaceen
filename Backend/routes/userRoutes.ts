import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,

} from "../controllers/userController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(protect, getUserProfile);

export default router;