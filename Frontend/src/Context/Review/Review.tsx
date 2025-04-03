import { useState } from "react";
import "./review.css";

import { StarRating, renderStars } from "../Stars";
import { reviews } from "../Product";
import { addReview } from "../../api/reviewsApi";
import { ObjectId } from "bson";
import { format } from "date-fns";

interface GetReviewsProps extends reviews {}

export const GetReviews: React.FC<GetReviewsProps> = ({
  name,
  title,
  rating,
  comment,
  createdAt,
}) => {
  const dateObject = new Date(createdAt as any);
  const formattedDate = format(dateObject, "MMM d, yyyy");

  return (
    <div className="review">
      <div className="rating">
        <div className="title">{title}</div>
        <div>{renderStars(rating)}</div>
      </div>
      <div>{comment}</div>
      <div className="dat-author">
        <div className="date">{formattedDate}</div>
        <div className="author">Reviewed by {name}</div>
      </div>
    </div>
  );
};

type AddReviewProps = {
  productId: ObjectId;
};

export const AddReview = ({ productId }: AddReviewProps) => {
  const [stars, setStars] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const review = await addReview(stars, title, comment, productId.toString());

    if (review === "success") {
      window.location.reload();
    }
  };

  const token = localStorage.getItem("authToken");

  return (
    <div className="add-review-container">
      <form onSubmit={handleReview}>
        <label htmlFor="">Your rating *</label>
        <StarRating rating={stars} setRating={setStars} />
        <label htmlFor="title">Review Title *</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="review">Your review *</label>
        <textarea
          name="review"
          required
          rows={10}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          type="submit"
          className={
            stars === 0 || title === "" || comment === "" || token === null
              ? "disabled"
              : ""
          }
        >
          Submit
        </button>
        {token === null ? (
          <div>
            <a href="/login">Login</a> or{" "}
            <a href="/register">create an account</a> to leave a review
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
