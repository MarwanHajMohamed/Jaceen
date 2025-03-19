import { Request as Req, Response as Res, NextFunction as Next } from "express";
import { User } from "../models"; // Import your User type (adjust the path if necessary)

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the `user` property to the request object
    }
  }
}

export interface RequestWithUser extends Request {
  user?: {
    _id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
  };
}

/**
 * Custom User interface used in combination with Express Request / Response types
 */
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

/**
 * Combine Express types with customer User interface
 */
export type Request = Req & User;
export type Response = Res & User;
export type NextFunction = Next;