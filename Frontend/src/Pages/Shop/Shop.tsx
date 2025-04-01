import "./shop.css";

import { Navigate, useParams } from "react-router-dom";
import Product from "../../Components/Common Components/Shop Product/Product";
import { useEffect, useState } from "react";
import { ProductContext } from "../../Context/Product";
import { getProducts } from "../../api/api";
import { TextField } from "@mui/material";

const validCategories: string[] = [
  "Hair Care",
  "Skin Care",
  "Sports Nutrition",
  "Training Programmes",
  "All Products",
];

export default function Category() {
  const { category } = useParams<string>();

  const [products, setProducts] = useState<ProductContext[]>([]);
  const [allProducts, setAllProducts] = useState<ProductContext[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string | number>("");

  if (typeof category !== "string" || !validCategories.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts();
        setLoading(false);
        setProducts(fetchedProducts.products);
        setAllProducts(fetchedProducts.products);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchValue)
      );
      setProducts(filteredProducts);
    }
  };

  let filteredProducts = products;
  if (category && category !== "All Products") {
    filteredProducts = products.filter(
      (product) => product.category === category
    );
  }

  return (
    <div className="shop-page-container">
      <div className="title-container">
        <div className="search-container">
          <div className="category-title">
            <div className="category-title-content">{category}</div>
          </div>
          <div className="search">
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="products">
        {loading ? (
          Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="loading-products">
              <div className="img"></div>
              <div className="title"></div>
              <div className="title"></div>
              <div className="price"></div>
              <div className="button"></div>
            </div>
          ))
        ) : filteredProducts.length > 0 || searchTerm !== "" ? (
          filteredProducts.length <= 0 ? (
            <div className="search-error">
              <i className="fa-solid fa-magnifying-glass"></i>
              It seems like what you are looking for does not exist. Try another
              search term.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Product
                _id={product._id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                category={product.category}
                imgs={product.imgs}
                description={product.description}
                why_jaceen={product.why_jaceen}
                product_highlights={product.product_highlights}
                how_to_use={product.how_to_use}
                ingredients={product.ingredients}
              />
            ))
          )
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}
