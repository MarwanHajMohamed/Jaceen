import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./product.css";

import { ProductContext, reviews } from "../../../Context/Product";
import { renderStars } from "../../../Context/Stars";
import { CartContext } from "../../../Context/Cart";
import { getReviews } from "../../../api/reviewsApi";

export default function Product(props: ProductContext) {
  const route: NavigateFunction = useNavigate();
  const { addToCart } = useContext(CartContext) || {};
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const cartItem = {
    _id: props._id,
    img: props.imgs[0],
    name: props.name,
    slug: props.slug,
    price: props.price,
    quantity: 1,
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReviews(props._id.toString());
        if (reviews.data.length > 0) {
          const totalRating = reviews.data.reduce(
            (sum: number, review: reviews) => sum + review.rating,
            0
          );
          setAverageRating(totalRating / reviews.data.length);
        } else {
          setAverageRating(null);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [props._id]);

  return (
    <div className="shop-product-container" id={props.name}>
      <div className="image-container">
        <img
          src={props.imgs[0]}
          alt=""
          onClick={() => route(`/product/${props.slug}`)}
        />
      </div>
      <div
        className="product-title"
        onClick={() => route(`/product/${props.slug}`)}
      >
        {props.name}
      </div>
      <div className="stars">
        {averageRating !== null ? renderStars(averageRating) : "No reviews"}
      </div>
      <div className="add-to-basket">
        <div>
          <div
            className="product-category"
            onClick={() => route(`/shop/${props.category}`)}
          >
            {props.category}
          </div>
          <div className="price">£{props.price}</div>
        </div>
      </div>
      <button
        onClick={() => {
          addToCart(cartItem, cartItem.quantity);
        }}
        className="add"
      >
        Add to basket
      </button>
    </div>
  );
}
