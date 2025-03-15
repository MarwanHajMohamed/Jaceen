import "./navbar.css";
import logo from "../../assets/logo.jpg";
import { CartContext } from "../../Context/Cart";
import { useAuth } from "../../hooks/useAuth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const route: NavigateFunction = useNavigate();
  const { cartItems } = useContext(CartContext);

  const [show, setShow] = useState(false);
  const accountModalRef = useRef<HTMLUListElement | null>(null);

  const API_URL = "http://localhost:4000";

  const { auth, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      return "success";
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountModalRef.current &&
        !accountModalRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="cart" onClick={() => route("/cart")}>
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart-total">
              {cartItems.length !== 0
                ? cartItems.reduce((total, item) => total + item.quantity, 0)
                : 0}
            </div>
          </div>
          <div className="account-container">
            <i className="fa-solid fa-user" onClick={() => setShow(!show)}></i>
            <ul
              className={show ? "account-modal show" : "account-modal"}
              ref={accountModalRef}
            >
              {auth === null ? (
                <>
                  <li
                    onClick={() => {
                      route("/login");
                      setShow(false);
                    }}
                  >
                    Login
                  </li>
                  <li
                    onClick={() => {
                      route("/register");
                      setShow(false);
                    }}
                  >
                    Register
                  </li>
                </>
              ) : (
                <>
                  <li>Orders</li>
                  <li onClick={handleLogout}>Logout</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
