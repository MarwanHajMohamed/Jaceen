import "./manageproducts.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts } from "../../../api/productsApi";
import { ProductContext } from "../../../Context/Product";
import Pagination from "../../../Components/Common Components/AdminPagination/Pagination";
import { useNavigate } from "react-router-dom";

export default function ManageProducts() {
  const route = useNavigate();

  // Fetch products with React Query
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "All Products"],
    queryFn: getProducts,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Make sure allProducts is defined and has products array
  const products = allProducts || [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="manage-products-container">
      {isLoading && (
        <div className="loading-indicator">Loading products...</div>
      )}

      {error && (
        <div className="error-message">
          Error loading products. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="products-table-wrapper">
            <button
              onClick={() => route("/account/new-product")}
              className="new-product"
            >
              New Product +
            </button>
            <table className="products-table">
              <thead>
                <tr>
                  <th className="image-column">Image</th>
                  <th className="name-column">Name</th>
                  <th className="stock-column">Stock</th>
                  <th className="gear-column"></th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty-message">
                      No products found in inventory
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product: ProductContext) => (
                    <tr key={product._id.toString()}>
                      <td className="image-column">
                        <img
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            borderRadius: 5,
                          }}
                          src={product.imgs[0]}
                          alt={product.name}
                        />
                      </td>
                      <td className="name-column">{product.name}</td>
                      <td className="stock-column">
                        {Number(product.countInStock) < 10 ? (
                          <span className="low">{product.countInStock}</span>
                        ) : (
                          product.countInStock
                        )}
                      </td>
                      <td className="gear-column">
                        <i className="fa-solid fa-gear"></i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
          />
          <div className="items-info">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, products.length)} of {products.length}{" "}
            products
          </div>
        </>
      )}
    </div>
  );
}
