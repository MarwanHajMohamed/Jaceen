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
      firstName: user.firstName,
      surname: user.surname,
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
  const { firstName, surname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = new User({
    firstName,
    surname,
    email,
    isAdmin: false,
  });

  user.setPassword(password);

  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  // The user is already attached to the request by the protect middleware
  if (!req.user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Return user details, excluding password
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
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
  logoutUser,
  getUserProfile
};