export interface Address {
  country: string;
  city: string;
  street: string;
  postcode: string;
  apartment?: string;
  county?: string;
}

export interface User {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
  shippingAddress?: Address
}