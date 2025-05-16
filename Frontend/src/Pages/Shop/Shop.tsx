import "./shop.css";
import { Navigate, useParams } from "react-router-dom";
import Product from "../../Components/Common Components/Shop Product/Product";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getProductByCategory,
  getProducts,
} from "../../api/productsApi";
import { ProductContext } from "../../Context/Product";
import { TextField } from "@mui/material";
import ReusablePagination from "../../Components/Common Components/Pagination/Pagination";
import LoadingSpinner from "../../Components/Common Components/Loading/LoadingSpinner";

export default function Category() {
  const [validCategories, setValidCategories] = useState<string[] | null>(null);
  const { category } = useParams<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setValidCategories(["All Products", ...res]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setValidCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: () => {
      if (category === undefined || category === "All Products") {
        return getProducts();
      }
      return getProductByCategory(category);
    },
    enabled: !!category,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Return loading state early
  if (!validCategories || !category) {
    return <LoadingSpinner />;
  }

  // After loading, check if category is invalid
  if (validCategories.length > 0 && !validCategories.includes(category)) {
    return <Navigate to="/404" replace />;
  }

  let filteredProducts = productsData || [];

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product: ProductContext) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  return (
    <div className="shop-page-container">
      <div className="wrapper">
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
            Array.from({ length: 8 }).map((_, index) => (
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
                <Product key={product._id.toString()} {...product} />
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
    </div>
  );
}
