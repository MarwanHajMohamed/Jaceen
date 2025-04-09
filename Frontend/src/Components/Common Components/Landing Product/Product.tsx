import { NavigateFunction, useNavigate } from "react-router-dom";
import "./product.css";

interface Props {
  img: string;
  name: string;
  price: number;
  slug: string;
}

export default function Product(props: Props) {
  const route: NavigateFunction = useNavigate();

  return (
    <div
      className="product-container"
      id={props.name}
      onClick={() => route(`/product/${props.slug}`)}
    >
      <div className="image-container">
        <img src={props.img} alt={props.name} loading="lazy" />
      </div>
      <div className="bottom">
        <div className="product-title">{props.name}</div>
        <div className="price">£{props.price}</div>
      </div>
    </div>
  );
}
