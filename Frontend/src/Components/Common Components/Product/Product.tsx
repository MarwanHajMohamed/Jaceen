import "./product.css";
import logo from "../../../assets/logo.jpg";

interface Props {
  img: string;
  title: string;
  price: number;
}

export default function Product(props: Props) {
  return (
    <div className="product-container" id={props.title}>
      <div className="jaceen-logo">
        <img src={logo} alt="" />
      </div>
      <div className="image-container">
        <img src={props.img} alt="" />
      </div>
      <div className="product-title">{props.title}</div>
      <div className="price">£{props.price}</div>
    </div>
  );
}
