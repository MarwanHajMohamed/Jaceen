import "./category.css";

import { Navigate, useParams } from "react-router-dom";

import productsJson from "../../data/products.json";
import Product from "../Common Components/Shop Product/Product";
import { useEffect, useState } from "react";

const validCategories: string[] = [
  "Hair Care",
  "Skin Care",
  "Sports Nutrition",
  "Training Programmes",
  "All",
];

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

export default function Category() {
  const { category } = useParams();

  const [products, setProducts] = useState<Product[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | number>("");

  if (typeof category !== "string" || !validCategories.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  let getProducts: Product[] = [];

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
        return product.title.toLowerCase().includes(searchValue);
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
        {products?.map((product) => {
          return <Product title={product.title} price={product.price} img="" />;
        })}
      </div>
    </div>
  );
}
