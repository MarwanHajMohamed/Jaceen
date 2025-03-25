import { useContext } from "react";
import "./cart.css";
import { CartContext } from "../../Context/Cart";
import { NavigateFunction, useNavigate } from "react-router-dom";

import ShoppingCart from "../../Components/Common Components/Shopping Cart/Cart";

export default function Cart() {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);

  const route: NavigateFunction = useNavigate();

  return (
    <div className="cart-page-container">
      <div className="shopping-cart-title">Shopping Cart</div>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty">
            <i className="fa-solid fa-trash-can"></i> Your shopping cart is
            empty
          </div>
          <button onClick={() => route("/shop/All Products")}>
            Browse products
          </button>
        </div>
      ) : (
        <div className="cart-page">
          <ShoppingCart />
          <div className="cart-total-container">
            <div className="top-side">
              <button onClick={clearCart}>
                <i className="fa-solid fa-trash-can"></i> Clear Cart
              </button>
              <div className="cart-total">
                <span>Total: </span>£{getCartTotal().toFixed(2)}
              </div>
            </div>
            <button className="checkout" onClick={() => route("/checkout")}>
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
