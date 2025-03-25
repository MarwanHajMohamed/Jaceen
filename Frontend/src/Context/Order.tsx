import { ObjectId } from "bson";

export interface Order {
  id?: string;
  userId?: string;
  name: string;
  phone: string;
  email: string;
  totalAmount: number;
  paymentId: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: OrderStatus;
  createdAt?: Date;
}

export interface OrderItem {
  productId: ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface Address {
  street: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
}

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export interface GuestInfo {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface CreateOrderRequest {
  userId?: string;
  guestInfo?: GuestInfo;
  totalAmount: number;
  paymentId: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: string;
}
