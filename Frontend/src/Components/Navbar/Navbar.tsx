import "./navbar.css";
import logo from "../../assets/logo.jpg";
import { CartContext } from "../../Context/Cart";
import { useAuth } from "../../hooks/useAuth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import { getProducts } from "../../api/api";
import { ProductContext } from "../../Context/Product";

interface GroupedProducts {
  [category: string]: ProductContext[];
}

export default function Navbar() {
  const route: NavigateFunction = useNavigate();
  const { cartItems } = useContext(CartContext);

  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
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
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();

        // Group products by category
        const grouped: GroupedProducts = fetchedProducts.products.reduce(
          (acc: GroupedProducts, product: ProductContext) => {
            acc[product.category] = acc[product.category] || [];
            acc[product.category].push(product);
            return acc;
          },
          {}
        );

        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

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
      <div className="advertisement">
        <div className="slider">
          <div className="content">
            <div>International Shipping</div>
            <div>Free UK Shipping over £60</div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="left-side">
          <ul className="items">
            <li className="nav-item">
              <div onClick={() => route("/")}>Home</div>
            </li>
            <li className="nav-item expand">
              <div onClick={() => route("/shop/All Products")}>Shop</div>
              <ul className="shop-categories">
                {Object.entries(groupedProducts).map(([category, products]) => (
                  <li key={category} className="shop-item">
                    <div onClick={() => route(`/shop/${category}`)}>
                      {category}
                    </div>
                    <ul className="product-list">
                      {products.map((product) => (
                        <li onClick={() => route(`/product/${product.slug}`)}>
                          {product.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <div onClick={() => route("/contact")}>Contact</div>
            </li>
          </ul>
        </div>
        <div className="middle-side">
          <div className="logo" onClick={() => route("/")}>
            <img src={logo} alt="" />
            <div>Jaceen</div>
          </div>
        </div>
        <div className="right-side">
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
