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

    res.cookie("sessionToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.json({
      _id: user._id,
      token: token,
      firstName: user.firstName,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress
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
  const { firstName, surname, email, phone, password, shippingAddress } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = new User({
    firstName,
    surname,
    email,
    phone,
    isAdmin: false,
    shippingAddress
  });

  user.setPassword(password);

  await user.save();

  if (user) {
    console.log("User: ", user);
    
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      shippingAddress: user.shippingAddress,
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


/**
 * @desc Logout
 */
const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("sessionToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

/**
 * Update user's shipping address
 * @route PUT /api/users/address
 * @access Private
 */
const updateUserAddress = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.shippingAddress = {
      ...user.shippingAddress,
      ...req.body
    };

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      surname: updatedUser.surname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      shippingAddress: updatedUser.shippingAddress
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 * Update user's profile details
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserDetails = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.surname = req.body.surname || user.surname;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      surname: updatedUser.surname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      shippingAddress: updatedUser.shippingAddress
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserAddress,
  updateUserDetails
};