import { useState, ReactNode } from "react";
import "./pagination.css";

type PaginationProps<T> = {
  items: T[];
  itemsPerPage?: number;
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
  className?: string;
};

function ReusablePagination<T>({
  items,
  itemsPerPage = 5,
  renderItem,
  emptyMessage = "No items to display",
  className = "",
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indexes for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Functions to handle pagination
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
    <div className="pagination-container">
      {items.length === 0 ? (
        <div className="empty-message">{emptyMessage}</div>
      ) : (
        <>
          <div className={`items-container ${className}`}>
            {currentItems.map((item, index) => (
              <div key={index} className="pagination-item">
                {renderItem(item, indexOfFirstItem + index)}
              </div>
            ))}
          </div>

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

              <div className="page-numbers">
                {totalPages <= 5 ? (
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
                  <>
                    <button
                      className={`page-number ${
                        currentPage === 1 ? "active" : ""
                      }`}
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
                      aria-current={
                        currentPage === totalPages ? "page" : undefined
                      }
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
            {Math.min(indexOfLastItem, items.length)} of {items.length} items
          </div>
        </>
      )}
    </div>
  );
}

export default ReusablePagination;
