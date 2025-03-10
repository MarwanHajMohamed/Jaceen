import "./navbar.css";

import logo from "../../assets/logo.jpg";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart";

export default function Navbar() {
  const route: NavigateFunction = useNavigate();
  const { cartItems } = useContext(CartContext);

  const [showInput, setShowInput] = useState<boolean>(false);

  return (
    <div className="navbar-container">
      <div className="wrapper">
        <div className="left-side">
          <ul className="items">
            <li onClick={() => route("/")}>Home</li>
            <li className="shop-link">
              <div onClick={() => route("/shop/All")}>
                Shop{" "}
                <span>
                  <i className="fa-solid fa-caret-down"></i>
                </span>
              </div>
              <ul className="shop-categories">
                <li onClick={() => route("/shop/Hair Care")}>Hair Care</li>
                <li onClick={() => route("/shop/Skin Care")}>Skin Care</li>
                <li onClick={() => route("/shop/Sports Nutrition")}>
                  Sports Nutrition
                </li>
                <li onClick={() => route("/shop/Training Programmes")}>
                  Training Programmes
                </li>
              </ul>
            </li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="middle-side">
          <div className="logo" onClick={() => route("/")}>
            <img src={logo} alt="" />
            <div>Jaceen</div>
          </div>
        </div>
        <div className="right-side">
          <div className="search-container">
            {showInput ? (
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                onBlur={() => setShowInput(false)}
                className="search-input"
              />
            ) : (
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => setShowInput(true)}
              ></i>
            )}
          </div>
          <div className="cart" onClick={() => route("/cart")}>
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart-total">
              {cartItems.length !== 0
                ? cartItems.reduce((total, item) => total + item.quantity, 0)
                : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
