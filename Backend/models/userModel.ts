import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

// Define TypeScript interface for User
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly set _id as an ObjectId
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Define Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export Model
const User = mongoose.model<IUser>("User", userSchema);

export { User };
