import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserAddress,

} from "../controllers/userController";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/profile").get(protect, getUserProfile);
router.route('/address').put(protect, updateUserAddress);

export default router;