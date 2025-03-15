import { useContext } from "react";
import { CartContext } from "../../../Context/Cart";
import { CartItem } from "../../../Context/CartInterface";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const route: NavigateFunction = useNavigate();

  return (
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
              <button className="delete" onClick={() => removeFromCart(item)}>
                -
              </button>
              {item.quantity}
              <button className="add" onClick={() => addToCart(item, 1)}>
                +
              </button>
            </div>
            <div className="cart-price">£{item.price.toFixed(2)}</div>
          </div>
        );
      })}
    </div>
  );
}
