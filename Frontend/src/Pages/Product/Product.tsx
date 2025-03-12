import { useParams } from "react-router-dom";
import "./product.css";
// import { products } from "../../data/products";
import { useContext, useEffect, useState } from "react";

import { ProductContext, reviews } from "../../Context/Product";
import { AddReview, GetReviews } from "../../Context/Review/Review";
import { CartContext } from "../../Context/Cart";
import { getProductByName } from "../../api/productsAPI";
import ReactMarkdown from "react-markdown";

export default function Product() {
  const { productTitle } = useParams<{ productTitle: string }>();
  const { addToCart } = useContext(CartContext)!;
  const [product, setProduct] = useState<ProductContext | undefined>();

  useEffect(() => {
    getProductByName(
      productTitle?.charAt(0).toUpperCase() +
        productTitle?.slice(1).toLowerCase()!
    ).then((res) => {
      setProduct(res);
      console.log(res);
    });
  }, [productTitle]);

  const [currImg, setCurrImg] = useState<string | undefined>(product?.imgs[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [expandedSection, setExpandedSection] = useState<string>("description");

  const cartItem = product
    ? {
        id: product.id,
        img: product.imgs[0],
        name: product.name,
        price: product.price,
        quantity: quantity,
      }
    : {
        id: 0,
        img: "",
        name: "",
        price: 0,
        quantity: quantity,
      };

  const toggleExpand = (section: string) => {
    setExpandedSection((prev) => (prev === section ? "" : section));
  };

  const addSubtractItems = (action: string) => {
    setQuantity((prevQuantity) =>
      action === "add" ? prevQuantity + 1 : Math.max(prevQuantity - 1, 0)
    );
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
            <img src={currImg} alt={product.name} />
          </div>
        </div>
        <div className="right-side">
          <div className="product-name">{product.name}</div>
          <div className="product-price">£{product.price.toFixed(2)}</div>
          <div className="product-category">{product.category}</div>
          <div className="quantity-container">
            <button
              className={`
                  ${quantity === 0 ? "disabled" : ""}
            `}
              onClick={() => addSubtractItems("minus")}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <div className="counter">{quantity}</div>
            <button onClick={() => addSubtractItems("add")}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="add-to-basket">
            <button onClick={() => addToCart(cartItem)}>Add to basket</button>
          </div>
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "description" ? "expand" : "hide"
                }`}
              >
                {product.description}
              </ReactMarkdown>
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "why_jaceen" ? "expand" : "hide"
                }`}
              >
                {product.why_jaceen}
              </ReactMarkdown>
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "product_highlights" ? "expand" : "hide"
                }`}
              >
                {product.product_highlights}
              </ReactMarkdown>
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "how_to_use" ? "expand" : "hide"
                }`}
              >
                {product.how_to_use}
              </ReactMarkdown>
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "ingredients" ? "expand" : "hide"
                }`}
              >
                {product.ingredients}
              </ReactMarkdown>
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
            product.reviews.map((review: reviews) => {
              return (
                <div>
                  <GetReviews {...review} />
                </div>
              );
            })
          )}
        </div>
        <hr />
        <div>
          <div className="subtitle">Add a review</div>
          <AddReview />
        </div>
      </div>
    </div>
  );
}
