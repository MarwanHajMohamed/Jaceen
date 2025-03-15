import "./checkout.css";
import Cart from "../../Components/Common Components/Shopping Cart/Cart";

export default function Checkout() {
  return (
    <div className="checkout-page-container">
      <div className="top-side">
        <div className="left-side">
          <Cart />
        </div>
        <div className="right-side"></div>
      </div>
      <div className="bottom-side"></div>
    </div>
  );
}
