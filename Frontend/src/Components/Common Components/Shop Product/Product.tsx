import { useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./product.css";

import { ProductContext } from "../../../Context/Product";
import { renderStars } from "../../../Context/Stars";
import { CartContext } from "../../../Context/Cart";

export default function Product(props: ProductContext) {
  const route: NavigateFunction = useNavigate();
  const { addToCart } = useContext(CartContext) || {};

  const cartItem = {
    _id: props._id,
    img: props.imgs[0],
    name: props.name,
    slug: props.slug,
    price: props.price,
    quantity: 1,
  };

  return (
    <div className="shop-product-container" id={props.name}>
      <div className="image-container">
        <img
          src={props.imgs[0]}
          alt=""
          onClick={() => route(`/product/${props.slug}`)}
        />
      </div>
      <div className="stars">
        {renderStars(
          props.reviews.reduce((sum, review) => sum + review.rating, 0) /
            props.reviews.length
        )}
      </div>
      <div className="product-title">{props.name}</div>
      <div className="add-to-basket">
        <div>
          <div className="product-category">{props.category}</div>
          <div className="price">£{props.price}</div>
        </div>
      </div>
      <button
        onClick={() => {
          addToCart(cartItem, cartItem.quantity);
        }}
        className="add"
      >
        {/* <i className="fa-solid fa-cart-shopping"></i> */}
        <div>Add to basket</div>
      </button>
    </div>
  );
}
