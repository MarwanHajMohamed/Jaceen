export interface Order {
    id?: string;
    userId: string;
    totalAmount: number;
    paymentId: string;
    items: OrderItem[];
    shippingAddress: Address;
    status: OrderStatus;
    createdAt?: Date;
}
  
export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}
  
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
  
export enum OrderStatus {
    PENDING = 'pending',
    PAID = 'paid',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELED = 'cancelled'
}
