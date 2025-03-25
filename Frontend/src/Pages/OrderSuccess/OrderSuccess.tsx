import "./ordersuccess.css";
import { useLocation } from "react-router-dom";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export default function OrderSuccess() {
  const location = useLocation();
  const { cartItems, shippingFee, totalAmount } = location.state as {
    cartItems: CartItem[];
    shippingFee: number;
    totalAmount: number;
  };

  return (
    <div className="order-success-page-container">
      <div className="wrapper">
        <div className="order-success-title">
          Your order has successfully been placed!
        </div>
        <div>Items ordered:</div>
        <div className="cart-items">
          {cartItems.map((item) => {
            return (
              <div className="cart-item">
                <div className="item">
                  <img src={item.img} alt="" />
                </div>
                <div className="item">
                  <div>{item.name}</div>
                </div>
                <div className="item">
                  <div>Qty: {item.quantity}</div>
                </div>
                <div className="item">
                  <div>£{item.price}</div>
                </div>
              </div>
            );
          })}
          <div className="cart-total">Subtotal: £{totalAmount}</div>
          <div className="cart-total">Shipping Fee: £{shippingFee}</div>
          <div className="cart-total">Total: £{totalAmount + shippingFee}</div>
        </div>
      </div>
    </div>
  );
}
