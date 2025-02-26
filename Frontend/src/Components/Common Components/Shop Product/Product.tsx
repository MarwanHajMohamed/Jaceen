import "./product.css";

interface Props {
  img: string;
  title: string;
  price: number;
}

export default function Product(props: Props) {
  return (
    <div className="shop-product-container" id={props.title}>
      <div className="image-container">
        <img src={props.img} alt="" />
      </div>
      <div className="product-title">{props.title}</div>
      <div className="price">£{props.price}</div>
      <button>Add to basket</button>
    </div>
  );
}
