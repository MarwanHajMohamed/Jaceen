import "./product.css";
import logo from "../../../assets/logo.jpg";

interface Props {
  img: string;
  name: string;
  price: number;
}

export default function Product(props: Props) {
  return (
    <div className="product-container" id={props.name}>
      <div className="jaceen-logo">
        <img src={logo} alt="" />
      </div>
      <div className="image-container">
        <img src={props.img} alt={props.name} loading="lazy" />
      </div>
      <div className="product-title">{props.name}</div>
      <div className="price">£{props.price}</div>
    </div>
  );
}
