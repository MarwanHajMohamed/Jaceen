import "./orders.css";
import { useContext, useEffect, useState } from "react";
import { CartContextType } from "../../../Context/CartInterface";
import { CartContext } from "../../../Context/Cart";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Cart from "../../../Components/Common Components/Shopping Cart/Cart";
import { TextField } from "@mui/material";
import { getCode, getNames } from "country-list";

export default function Orders() {
  const route: NavigateFunction = useNavigate();

  const { cartItems, getCartTotal } = useContext<CartContextType>(CartContext);

  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const userCountryCode = data.country; // e.g., "GB", "US", etc.
        const countryName = getNames().find(
          (name) => getCode(name) === userCountryCode
        );

        if (countryName) {
          setSelectedCountry(countryName);
        }
      } catch (error) {
        console.error("Error fetching user country:", error);
      }
    };

    fetchUserCountry();
  }, []);

  const shipping: number =
    getCartTotal() > 60 &&
    selectedCountry === "United Kingdom of Great Britain and Northern Ireland"
      ? 0
      : 5;

  return (
    <div className="orders-component-container">
      {cartItems.length === 0 ? (
        <div className="empty">
          <div>Your shopping basket is empty</div>
          <button onClick={() => route("/shop/All")}>Browse products</button>
        </div>
      ) : (
        <div>
          <Cart />
          <div className="total-container">
            <div className="row">
              <label>Subtotal</label>
              <div>£{getCartTotal().toFixed(2)}</div>
            </div>
            <div className="row">
              <label>Shipping</label>
              <div>£{shipping.toFixed(2)}</div>
            </div>
            <div className="coupon">
              <TextField
                variant="standard"
                label="Coupon code"
                type="text"
                sx={{
                  width: "200px",
                  fontSize: "0.2rem",
                }}
                size="small"
              />
              <button>Apply Coupon</button>
            </div>
            <div className="row">
              <label>Total</label>
              <div>£{(getCartTotal() + shipping).toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
