import { Model, Document } from "mongoose";

/**
 * Represents a user
 */
export interface User {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UserDocument extends User, Document {
  matchPassword: (password: string) => Promise<Boolean>;
}

export interface UserModel extends Model<UserDocument> {}