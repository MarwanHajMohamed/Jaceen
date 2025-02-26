import "./navbar.css";

import logo from "../../assets/logo.jpg";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Navbar() {
  const route: NavigateFunction = useNavigate();

  return (
    <div className="navbar-container">
      <div className="wrapper">
        <div className="left-side">
          <div className="logo" onClick={() => route("/")}>
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="middle-side">
          <ul className="items">
            <li onClick={() => route("/")}>Home</li>
            <li onClick={() => route("/shop/All")}>
              Shop{" "}
              <span>
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="right-side">
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </div>
  );
}
