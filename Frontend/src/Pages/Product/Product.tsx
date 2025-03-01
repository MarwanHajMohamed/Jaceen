import { useParams } from "react-router-dom";
import "./product.css";
import { products } from "../../data/products";
import { useState } from "react";

import { ProductContext } from "../../Context/Product";

export default function Product() {
  const { productID } = useParams();

  const product: ProductContext = products.find(
    (p) => p.id === Number(productID)
  );

  const [currImg, setCurrImg] = useState<string>(product.imgs[0]);

  if (!product)
    return <div className="product-not-found">Product not found</div>;

  return (
    <div className="product-page-container">
      <div className="wrapper">
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
          <h4>Description</h4>
          <div className="description">{product.description}</div>
        </div>
      </div>
    </div>
  );
}
