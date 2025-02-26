import { NavigateFunction, useNavigate } from "react-router-dom";
import "./product.css";

interface Props {
  id: number;
  img: string;
  title: string;
  price: number;
  category: string;
}

export default function Product(props: Props) {
  const route: NavigateFunction = useNavigate();
  return (
    <div className="shop-product-container" id={props.title}>
      <div className="image-container">
        <img
          src={props.img}
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
