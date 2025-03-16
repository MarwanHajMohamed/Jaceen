import "./checkout.css";
import Cart from "../../Components/Common Components/Shopping Cart/Cart";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getCode, getNames } from "country-list";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Cart";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CartContextType } from "../../Context/CartInterface";

export default function Checkout() {
  const route: NavigateFunction = useNavigate();
  const { cartItems, getCartTotal } = useContext<CartContextType>(CartContext);
  const countries: string[] = getNames();

  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const [expiry, setExpiry] = useState<string>("");

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length === 1 && Number(value) > 1) {
      value = `0${value}`;
    }

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    setExpiry(value);
  };

  const shipping: number =
    getCartTotal() > 60 &&
    selectedCountry === "United Kingdom of Great Britain and Northern Ireland"
      ? 0
      : 5;

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

  return (
    <div className="checkout-page-container">
      <div className="top-side">
        <div className="left-side">
          <div className="title">Your orders</div>
          {cartItems.length === 0 ? (
            <div className="empty">
              <div>Your shopping basket is empty</div>
              <button onClick={() => route("/shop/All")}>
                Browse products
              </button>
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
                      width: "200px", // Adjust width as needed
                      fontSize: "0.2rem", // Smaller text size
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
        <div className="right-side">
          <div className="title">Billing Details</div>
          <FormControl fullWidth className="form">
            <div className="name">
              <TextField
                variant="standard"
                label="First Name"
                type="text"
                required
              />
              <TextField
                variant="standard"
                label="Surname"
                type="text"
                required
              />
            </div>
            <FormControl fullWidth variant="standard">
              <InputLabel id="country-label">Select a country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="standard"
              label="Street name and house number"
              type="text"
              required
            />
            <TextField
              variant="standard"
              label="Apartment, suite, unit, etc. (optional)"
              type="text"
            />
            <TextField
              variant="standard"
              label="Town / City"
              type="text"
              required
            />
            <TextField
              variant="standard"
              label="County (optional)"
              type="text"
            />
            <TextField
              variant="standard"
              label="Postcode"
              type="text"
              required
            />
            <TextField
              variant="standard"
              label="Phone Number"
              type="tel"
              required
            />
            <TextField variant="standard" label="Email" type="email" required />
          </FormControl>
        </div>
      </div>
      <div className="bottom-side">
        <div className="title">Card Details</div>
        <FormControl fullWidth className="form">
          <TextField
            variant="standard"
            label="Card Number"
            type="number"
            required
          />
          <div className="month-cvc">
            <TextField
              variant="standard"
              label="Expiry (MM/YY)"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              required
            />
            <TextField variant="standard" label="CVC" type="number" required />
          </div>
        </FormControl>
      </div>
      <button className="order">Place Order</button>
    </div>
  );
}
