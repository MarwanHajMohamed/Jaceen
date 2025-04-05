// Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
  goToNextPage,
  goToPrevPage,
}) => {
  return (
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
              className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
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
                  <button className="page-number active" aria-current="page">
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
  );
};

export default Pagination;
