import mongoose, { Document, Schema } from "mongoose";
import crypto from 'crypto';

export interface IAddress {
  country: string;
  city: string;
  street: string;
  postcode: string;
  apartment?: string;
  county?: string;
}

// Define interface for User
export interface IUser extends Document {
  _id: string;
  firstName: string;
  surname: string,
  email: string;
  phone: string;
  isAdmin: boolean;
  passwordHash: string;
  passwordSalt: string;
  shippingAddress: IAddress;
  setPassword: (password: string) => void;
  validatePassword: (password: string) => boolean;
}

// Define Schema
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true},
  isAdmin: { type: Boolean, default: false },
  passwordHash: { type: String, required: true },
  passwordSalt: { type: String, required: true },
  shippingAddress: {
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    postcode: { type: String, default: "" },
    apartment: { type: String, default: "" },
    county: { type: String, default: "" },
  },
}, { timestamps: true });

// Instance method: Hash and set password
UserSchema.methods.setPassword = function (this: IUser, password: string) {
  this.passwordSalt = crypto.randomBytes(16).toString("hex");

  this.passwordHash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 1000, 64, "sha512")
    .toString("hex");
};

// Instance method: Validate password
UserSchema.methods.validatePassword = function (this: IUser, password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.passwordSalt, 1000, 64, "sha512")
    .toString("hex");

  return this.passwordHash === hash;
};

// Export Model
export default mongoose.model<IUser>("User", UserSchema);
