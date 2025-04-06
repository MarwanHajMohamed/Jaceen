import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import "./success.css";

export default function Success() {
  const location = useLocation();
  const { name, price, category, stock } = location.state as {
    name: string;
    price: string;
    category: string;
    stock: string;
  };

  const route: NavigateFunction = useNavigate();

  const returnShop = () => {
    route("/shop/All%20Products");
    window.location.reload();
  };

  return (
    <div className="success-container">
      <h3>Added new product!</h3>
      <div>Name: {name}</div>
      <div>Price: {price}</div>
      <div>Price: {category}</div>
      <div>Stock: {stock}</div>
      <button onClick={returnShop}>Browse the shop</button>
    </div>
  );
}
