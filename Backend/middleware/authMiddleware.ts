import { NextFunction, Request, Response } from "../types/express";
import jwt, {JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../models/";
import asyncHandler from "express-async-handler";

/**
 * Middleware used to protect routes from unauthorized users
 */
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const secret: Secret = process.env.JWT_SECRET!;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, secret) as JwtPayload;

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }

        // Assign to req.user
        req.user = {
          _id: user._id,
          firstName: user.firstName,
          surname: user.surname,
          phone: user.phone,
          email: user.email,
          isAdmin: user.isAdmin,
        };

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
    
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

/**
 * Middleware used to protect routes from users who are not flagged as admin
 */
const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    res.status(403); // Change to 403 for "Forbidden"
    throw new Error("Not authorized as an admin");
  }
};

const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header("x-auth-token");
    
    // If no token, proceed as guest
    if (!token) {
      console.log("No token, proceeding as guest.");
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const user = await User.findById(decoded.user?.id || decoded.id);

    console.log("User", user);
    
    
    if (!user) {
      console.log("User not found, proceeding as guest.");
      return next();
    }

    // Set user in request
    req.user = {
      _id: user._id,
      firstName: user.firstName,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    
    next();
  } catch (err) {
    console.log("Token verification failed, proceeding as guest:", err);
    next();
  }
};

export { protect, admin, optionalAuth };
