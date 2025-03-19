import { useState } from "react";
import { GetReviews } from "../../../Context/Review/Review";
import { reviews } from "../../../Context/Product";
import "./pagination.css";

type props = {
  reviews: reviews[];
};

const Pagination = ({ reviews }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // You can adjust this number as needed

  // Calculate indexes for current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Calculate total number of pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Functions to handle pagination
  const goToNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  return (
    <div className="review-container">
      {reviews.length === 0 ? (
        <div>Be the first to leave a review on this product!</div>
      ) : (
        <>
          {currentReviews.map((review: reviews, index: number) => (
            <div key={index}>
              <GetReviews {...review} />
            </div>
          ))}

          {/* Pagination controls */}
          <div className="pagination-controls">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <span className="page-indicator">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
