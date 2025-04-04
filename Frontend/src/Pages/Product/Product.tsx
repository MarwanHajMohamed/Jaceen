import { useLocation, useParams } from "react-router-dom";
import "./product.css";
import { useContext, useEffect, useState } from "react";

import { ProductContext, reviews } from "../../Context/Product";
import { AddReview, GetReviews } from "../../Context/Review/Review";
import { CartContext } from "../../Context/Cart";
import { getProductBySlug } from "../../api/productsApi";
import ReactMarkdown from "react-markdown";
import { getReviews } from "../../api/reviewsApi";
import ReusablePagination from "../../Components/Common Components/Pagination/Pagination";

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useContext(CartContext)!;
  const [product, setProduct] = useState<ProductContext | undefined>();
  const [currImg, setCurrImg] = useState<string | undefined>(product?.imgs[0]);
  const [reviews, setReviews] = useState<reviews[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [expandedSection, setExpandedSection] = useState<string>("description");

  const location = useLocation();

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug).then((res) => {
        setProduct(res);
        setCurrImg(res.imgs[0]);
      });
    }
  }, [slug]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (product?._id) {
        try {
          const { data } = await getReviews(product._id.toString());
          setReviews(data);
        } catch (error) {
          if (error === "") console.error("Error fetching reviews:", error);
          setReviews([]);
        }
      }
    };

    fetchReviews();
  }, [product]);

  useEffect(() => {
    setTimeout(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 300); // Delay to allow component rendering
  }, [location]);

  if (!product)
    return <div className="product-not-found">Product not found</div>;

  const cartItem = {
    _id: product._id,
    img: product.imgs[0],
    name: product.name,
    slug: product.slug,
    price: product.price,
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
            <button onClick={() => addToCart(cartItem, quantity)}>
              Add to basket
            </button>
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "description" ? "expand" : "hide"
                }`}
              >
                {product.description}
              </ReactMarkdown>
              <hr />
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "why_jaceen" ? "expand" : "hide"
                }`}
              >
                {product.why_jaceen}
              </ReactMarkdown>
              <hr />
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "product_highlights" ? "expand" : "hide"
                }`}
              >
                {product.product_highlights}
              </ReactMarkdown>
              <hr />
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "how_to_use" ? "expand" : "hide"
                }`}
              >
                {product.how_to_use}
              </ReactMarkdown>
              <hr />
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
              <ReactMarkdown
                className={`section ${
                  expandedSection === "ingredients" ? "expand" : "hide"
                }`}
              >
                {product.ingredients}
              </ReactMarkdown>
              <hr />
            </div>
          )}
        </div>
      </div>
      <div className="bottom">
        <h3>Reviews ({reviews.length})</h3>
        <div className="review-container" id="reviews">
          <ReusablePagination
            items={reviews}
            itemsPerPage={5}
            renderItem={(review) => <GetReviews {...review} />}
            emptyMessage="Be the first to leave a review on this product!"
            className="reviews-pagination"
          />
        </div>
        <div>
          <AddReview productId={product._id} />
        </div>
      </div>
    </div>
  );
}
