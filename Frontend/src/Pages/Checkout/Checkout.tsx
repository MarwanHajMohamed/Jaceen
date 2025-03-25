import "./checkout.css";
import PaymentForm from "./Payment/PaymentForm";
import Orders from "./Orders/Orders";
import BillingForm from "./Billing/BillingForm";
import { useContext, useState, useEffect } from "react";
import { CartContextType } from "../../Context/CartInterface";
import { CartContext } from "../../Context/Cart";
import { useAuth } from "../../hooks/useAuth"; // Adjust the import path

export default function Checkout() {
  const { getCartTotal } = useContext<CartContextType>(CartContext);
  const { user } = useAuth(); // Get user from auth hook

  // SHIPPING DETAILS
  const [country, setCountry] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [city, setCity] = useState<string>("");

  // PERSONAL DETAILS
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Prefill user details when user is loaded
  useEffect(() => {
    if (user) {
      // Prefill personal details
      setFirstName(user.firstName || "");
      setSurname(user.surname || "");
      setPhone(user.phoneNumber || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const shippingInfo = {
    country,
    setCountry,
    street,
    setStreet,
    county,
    setCounty,
    apartment,
    setApartment,
    postcode,
    setPostcode,
    city,
    setCity,
  };

  return (
    <div className="checkout-page-container">
      <div className="top-side">
        <div className="left-side">
          <div className="title">Your orders</div>
          <Orders />
        </div>
        <div className="right-side">
          <div className="title">Billing Details</div>
          <BillingForm
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            firstName={firstName}
            setFirstName={setFirstName}
            surname={surname}
            setSurname={setSurname}
            country={country}
            setCountry={setCountry}
            street={street}
            setStreet={setStreet}
            county={county}
            setCounty={setCounty}
            apartment={apartment}
            setApartment={setApartment}
            postcode={postcode}
            setPostcode={setPostcode}
            city={city}
            setCity={setCity}
          />
        </div>
      </div>
      <div className="bottom-side">
        <div className="title">Card Details</div>
        <PaymentForm
          phone={phone}
          email={email}
          totalAmount={getCartTotal()}
          firstName={firstName}
          surname={surname}
          shippingInfo={shippingInfo}
        />
      </div>
    </div>
  );
}
