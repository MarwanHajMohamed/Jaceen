import { NavigateFunction, useNavigate } from "react-router-dom";
import "./product.css";

import { ProductContext } from "../../../Context/Product";
import { renderStars } from "../../../Context/RenderStars";

export default function Product(props: ProductContext) {
  const route: NavigateFunction = useNavigate();

  return (
    <div className="shop-product-container" id={props.title}>
      <div className="image-container">
        <img
          src={props.imgs[0]}
          alt=""
          onClick={() =>
            route(`/product/${props.title.replace(/ /g, "-").toLowerCase()}`)
          }
        />
      </div>
      <div className="stars">
        {renderStars(
          props.reviews.reduce((sum, review) => sum + review.rating, 0) /
            props.reviews.length
        )}
      </div>
      <div className="product-title">{props.title}</div>
      <div className="product-category">{props.category}</div>
      <div className="price">£{props.price}</div>
    </div>
  );
}
