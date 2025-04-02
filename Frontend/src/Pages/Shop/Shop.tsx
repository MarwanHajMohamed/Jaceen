import "./shop.css";
import { Navigate, useParams } from "react-router-dom";
import Product from "../../Components/Common Components/Shop Product/Product";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/api";
import { ProductContext } from "../../Context/Product";
import { TextField } from "@mui/material";
import ReusablePagination from "../../Components/Common Components/Pagination/Pagination";

const validCategories: string[] = [
  "Hair Care",
  "Skin Care",
  "Sports Nutrition",
  "Training Programmes",
  "All Products",
];

export default function Category() {
  const { category } = useParams<string>();

  const [searchTerm, setSearchTerm] = useState<string>("");

  if (typeof category !== "string" || !validCategories.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  // Fetch products with React Query
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // Cache products for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  let filteredProducts = allProducts?.products || [];

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product: ProductContext) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  if (category && category !== "All Products") {
    filteredProducts = filteredProducts.filter(
      (product: ProductContext) => product.category === category
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
        {isLoading ? (
          Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="loading-products">
              <div className="img"></div>
              <div className="title"></div>
              <div className="title"></div>
              <div className="price"></div>
              <div className="button"></div>
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          <ReusablePagination
            items={filteredProducts}
            itemsPerPage={8}
            renderItem={(product: ProductContext) => (
              <Product
                key={product._id.toString()}
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
            )}
            emptyMessage="Be the first to leave a review on this product!"
            className="products-pagination"
          />
        ) : (
          <div className="search-error">
            <i className="fa-solid fa-magnifying-glass"></i>
            No products found. Try another search term.
          </div>
        )}
      </div>
    </div>
  );
}
