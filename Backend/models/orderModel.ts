import mongoose, { Document, Schema } from 'mongoose';

// Define interfaces for type safety
export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  slug: string;
}

export interface IShippingAddress {
  street: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
}

export interface IGuestInfo {
    firstName: string;
    surname: string;
    email: string;
    phoneNumber: string;
  }

export interface IOrder extends Document {
  userId?: mongoose.Types.ObjectId;
  guestInfo?: IGuestInfo;
  isGuestOrder: boolean;
  totalAmount: number;
  paymentId: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  status: string;
  createdAt: Date;
}

// Order Schema
const OrderSchema: Schema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: function(this: IOrder) {
        return !this.isGuestOrder;
      }
    },
    guestInfo: {
      email: {
        type: String,
        required: function(this: IOrder) {
          return this.isGuestOrder;
        }
      },
      firstName: {
        type: String,
        required: function(this: IOrder) {
          return this.isGuestOrder;
        }
      },
      surname: {
        type: String,
        required: function(this: IOrder) {
          return this.isGuestOrder;
        }
      },
      phoneNumber: {
        type: String,
        required: function(this: IOrder) {
          return this.isGuestOrder;
        }
      }
    },
    isGuestOrder: {
      type: Boolean,
      default: false
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      slug: {
        type: String,
        required: true
      }
    }],
    shippingAddress: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String,
        required: false
      },
      postcode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    status: {
      type: String,
      required: true,
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

export default mongoose.model<IOrder>('Order', OrderSchema);