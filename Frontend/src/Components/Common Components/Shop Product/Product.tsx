import { NavigateFunction, useNavigate } from "react-router-dom";
import "./product.css";

import { ProductContext } from "../../../Context/Product";

export default function Product(props: ProductContext) {
  const route: NavigateFunction = useNavigate();
  return (
    <div className="shop-product-container" id={props.title}>
      <div className="image-container">
        <img
          src={props.imgs[0]}
          alt=""
          onClick={() => route(`/product/${props.id}`)}
        />
      </div>
      <div className="stars">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
      <div className="product-title">{props.title}</div>
      <div className="product-category">{props.category}</div>
      <div className="price">£{props.price}</div>
    </div>
  );
}
