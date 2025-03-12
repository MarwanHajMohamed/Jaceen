import "./category.css";

import { Navigate, useParams } from "react-router-dom";

import { products as productsJson } from "../../data/products";
import Product from "../../Components/Common Components/Shop Product/Product";
import { useEffect, useState } from "react";

import { ProductContext } from "../../Context/Product";

const validCategories: string[] = [
  "Hair Care",
  "Skin Care",
  "Sports Nutrition",
  "Training Programmes",
  "All",
];

export default function Category() {
  const { category } = useParams<string>();

  const [products, setProducts] = useState<ProductContext[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | number>("");

  if (typeof category !== "string" || !validCategories.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  let getProducts: ProductContext[] = [];

  if (category === "All") {
    getProducts = productsJson;
  } else {
    getProducts = productsJson.filter(
      (product) => product.category === category
    );
  }

  useEffect(() => {
    setProducts(getProducts);
  }, [category]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setProducts(getProducts);
    } else {
      const filteredProducts = getProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchValue);
      });
      setProducts(filteredProducts);
    }
  };

  return (
    <div className="category-page-container">
      <div className="title-container">
        <div className="category-title">{category}</div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="products">
        {products.length > 0 || searchTerm !== "" ? (
          products.length <= 0 ? (
            <div className="search-error">
              <i className="fa-solid fa-magnifying-glass"></i>
              It seems like what you are looking for does not exist. Try another
              search term.
            </div>
          ) : (
            products.map((product) => {
              return (
                <Product
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  imgs={product.imgs}
                  description={product.description}
                  why_jaceen={product.why_jaceen}
                  product_highlights={product.product_highlights}
                  how_to_use={product.how_to_use}
                  ingredients={product.ingredients}
                  reviews={product.reviews}
                />
              );
            })
          )
        ) : (
          Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="loading-products">
              <div className="img"></div>
              <div className="title"></div>
              <div className="title"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
