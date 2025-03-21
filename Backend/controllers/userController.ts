import { Request, Response } from "../types/express";
import asyncHandler from "express-async-handler";
import { User } from "../models";
import generateToken from "../utils/generateToken";

/**
 * Authenticate user and get token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.validatePassword(password)) {
    const token = generateToken(user._id);

    // Set token in an HTTP-only cookie
    res.cookie("sessionToken", token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: false, // Ensures the cookie is sent over HTTPS in production
      sameSite: "strict", // Prevents the cookie from being sent with cross-site requests
      maxAge: 3600000, // Expires in 1 hour
    });

    res.json({
      _id: user._id,
      token: token,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

/**
 * Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = new User({
    name,
    email,
    isAdmin: false, // Default value
  });

  user.setPassword(password);

  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("sessionToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

export {
  authUser,
  registerUser,
  logoutUser
};