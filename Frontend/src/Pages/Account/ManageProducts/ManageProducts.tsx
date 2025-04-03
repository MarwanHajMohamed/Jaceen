import "./manageproducts.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts } from "../../../api/productsApi";
import { ProductContext } from "../../../Context/Product";

export default function ManageProducts() {
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

  // Early return for loading state
  if (isLoading) {
    return (
      <div className="manage-products-container">
        <h2>Manage Products</h2>
        <div className="loading-indicator">Loading products...</div>
      </div>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className="manage-products-container">
        <div className="error-message">
          Error loading products. Please try again.
        </div>
      </div>
    );
  }

  // Make sure allProducts is defined and has products array
  const products = allProducts?.products || [];

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Pagination navigation
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
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Stock</th>
              <th></th>
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
                  <td>
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
                  <td>{product.name}</td>
                  <td
                    className={
                      Number(product.countInStock) < 10 ? "stock low" : "stock"
                    }
                  >
                    {product.countInStock}
                  </td>
                  <td>
                    <i className="fa-solid fa-gear"></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="pagination-button"
            aria-label="Previous page"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Page numbers */}
          <div className="page-numbers">
            {totalPages <= 5 ? (
              // Show all page numbers if 5 or fewer pages
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-number ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                  onClick={() => goToPage(i + 1)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))
            ) : (
              // Show condensed version for more than 5 pages
              <>
                <button
                  className={`page-number ${currentPage === 1 ? "active" : ""}`}
                  onClick={() => goToPage(1)}
                  aria-label="Page 1"
                  aria-current={currentPage === 1 ? "page" : undefined}
                >
                  1
                </button>

                {currentPage > 3 && <span className="ellipsis">...</span>}

                {currentPage !== 1 && currentPage !== totalPages && (
                  <>
                    {currentPage > 2 && currentPage < totalPages - 1 && (
                      <button
                        className="page-number active"
                        aria-current="page"
                      >
                        {currentPage}
                      </button>
                    )}
                  </>
                )}

                {currentPage < totalPages - 2 && (
                  <span className="ellipsis">...</span>
                )}

                <button
                  className={`page-number ${
                    currentPage === totalPages ? "active" : ""
                  }`}
                  onClick={() => goToPage(totalPages)}
                  aria-label={`Page ${totalPages}`}
                  aria-current={currentPage === totalPages ? "page" : undefined}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
            aria-label="Next page"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}

      <div className="items-info">
        Showing {indexOfFirstItem + 1}-
        {Math.min(indexOfLastItem, products.length)} of {products.length}{" "}
        products
      </div>
    </div>
  );
}
