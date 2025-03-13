import { useContext } from "react";
import "./cart.css";
import { CartContext } from "../../Context/Cart";
import { CartItem } from "../../Context/CartInterface";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

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
          <button onClick={() => route("/shop/All")}>Browse products</button>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-table">
            <div className="headers">
              <div className="header"></div>
              <div className="header">Name</div>
              <div className="header">Quantity</div>
              <div className="header">Price</div>
            </div>
            {cartItems.map((item: CartItem) => {
              return (
                <div className="cart-item">
                  <div className="cart-image">
                    <img src={item.img} alt="" />
                  </div>
                  <div
                    className="cart-title"
                    onClick={() => route(`/product/${item.slug}`)}
                  >
                    {item.name}
                  </div>
                  <div className="cart-quantity">
                    <button
                      className="delete"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button className="add" onClick={() => addToCart(item)}>
                      +
                    </button>
                  </div>
                  <div className="cart-price">£{item.price.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
          <div className="cart-total-container">
            <div className="top-side">
              <button onClick={clearCart}>
                <i className="fa-solid fa-trash-can"></i> Clear Cart
              </button>
              <div className="cart-total">
                <span>Total: </span>£{getCartTotal().toFixed(2)}
              </div>
            </div>
            <button className="checkout">Proceed to checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
