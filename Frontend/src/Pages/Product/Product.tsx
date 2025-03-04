import { useParams } from "react-router-dom";
import "./product.css";
import { products } from "../../data/products";
import { useState } from "react";

import { ProductContext } from "../../Context/Product";
import { StarRating, renderStars } from "../../Context/Stars";

export default function Product() {
  const { productTitle } = useParams();

  const product: ProductContext | undefined = products.find(
    (p) => p.title.replace(/ /g, "-").toLowerCase() === productTitle
  );

  const [currImg, setCurrImg] = useState<string | undefined>(product?.imgs[0]);
  const [expandedSection, setExpandedSection] = useState<string>("description");
  const [stars, setStars] = useState<number>(0);

  const toggleExpand = (section: string) => {
    setExpandedSection((prev) => (prev === section ? "" : section));
  };

  if (!product)
    return <div className="product-not-found">Product not found</div>;

  return (
    <div className="product-page-container">
      <div className="top">
        <div className="left-side">
          <div className="product-images">
            {product.imgs.map((img) => {
              return (
                <img
                  className={`${currImg === img ? "active" : ""}`}
                  src={img}
                  alt=""
                  onClick={() => setCurrImg(img)}
                />
              );
            })}
          </div>
          <div className="display-product">
            <img src={currImg} alt={product.title} />
          </div>
        </div>
        <div className="right-side">
          <div className="product-title">{product.title}</div>
          <div className="product-price">£{product.price.toFixed(2)}</div>
          <div className="product-category">{product.category}</div>
          {product.description && (
            <div>
              <h4
                onClick={() => {
                  toggleExpand("description");
                }}
              >
                Description
                <span
                  className={`arrow ${
                    expandedSection === "description" ? "rotate" : ""
                  }`}
                >
                  ▼
                </span>
              </h4>
              <hr />
              <div
                className={`section ${
                  expandedSection === "description" ? "expand" : "hide"
                }`}
              >
                {product.description}
              </div>
            </div>
          )}
          {product.why_jaceen && (
            <div>
              <h4
                onClick={() => {
                  toggleExpand("why_jaceen");
                }}
              >
                Why Jaceen
                <span
                  className={`arrow ${
                    expandedSection === "why_jaceen" ? "rotate" : ""
                  }`}
                >
                  ▼
                </span>
              </h4>
              <hr />
              <div
                className={`section ${
                  expandedSection === "why_jaceen" ? "expand" : "hide"
                }`}
              >
                {product.why_jaceen}
              </div>
            </div>
          )}
          {product.product_highlights && (
            <div>
              <h4
                onClick={() => {
                  toggleExpand("product_highlights");
                }}
              >
                Product Highlights
                <span
                  className={`arrow ${
                    expandedSection === "product_highlights" ? "rotate" : ""
                  }`}
                >
                  ▼
                </span>
              </h4>
              <hr />
              <div
                className={`section ${
                  expandedSection === "product_highlights" ? "expand" : "hide"
                }`}
              >
                {product.product_highlights}
              </div>
            </div>
          )}
          {product.how_to_use && (
            <div>
              <h4
                onClick={() => {
                  toggleExpand("how_to_use");
                }}
              >
                How to Use
                <span
                  className={`arrow ${
                    expandedSection === "how_to_use" ? "rotate" : ""
                  }`}
                >
                  ▼
                </span>
              </h4>
              <hr />
              <div
                className={`section ${
                  expandedSection === "how_to_use" ? "expand" : "hide"
                }`}
              >
                {product.how_to_use}
              </div>
            </div>
          )}
          {product.ingredients && (
            <div>
              <h4
                onClick={() => {
                  toggleExpand("ingredients");
                }}
              >
                Ingredients
                <span
                  className={`arrow ${
                    expandedSection === "ingredients" ? "rotate" : ""
                  }`}
                >
                  ▼
                </span>
              </h4>
              <hr />
              <div
                className={`section ${
                  expandedSection === "ingredients" ? "expand" : "hide"
                }`}
              >
                {product.ingredients}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bottom">
        <h3>Reviews ({product.reviews.length})</h3>
        <div className="review-container">
          {product.reviews.length === 0 ? (
            <div>Be the first to leave a review on this product!</div>
          ) : (
            product.reviews.map((review) => {
              return (
                <div className="review">
                  <div className="author-rating">
                    <div className="author">{review.name}</div>
                    <div>{renderStars(review.rating)}</div>
                  </div>
                  <div>{review.review}</div>
                  <div className="date">{review.date}</div>
                </div>
              );
            })
          )}
        </div>
        <hr />
        <div className="add-review-container">
          <div className="subtitle">Add a review</div>
          <form action="">
            <label htmlFor="">Your rating *</label>
            <StarRating rating={stars} setRating={setStars} />
            <label htmlFor="review">Your review *</label>
            <textarea name="review" rows={10}></textarea>
            <label htmlFor="name">Name *</label>
            <input name="name" type="text" />
            <label htmlFor="name">Email *</label>
            <input name="email" type="email" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
