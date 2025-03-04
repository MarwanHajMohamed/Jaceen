import { useState } from "react";
import { StarRating, renderStars } from "./Stars";
import { reviews } from "./Product";

export const GetReviews = ({ name, review, rating, date }: reviews) => {
  return (
    <div className="review">
      <div className="author-rating">
        <div className="author">{name}</div>
        <div>{renderStars(rating)}</div>
      </div>
      <div>{review}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export const AddReview = () => {
  const [stars, setStars] = useState<number>(0);

  return (
    <form action="">
      <label htmlFor="">Your rating *</label>
      <StarRating rating={stars} setRating={setStars} />
      <label htmlFor="review">Your review *</label>
      <textarea name="review" rows={10} />
      <label htmlFor="name">Name *</label>
      <input name="name" type="text" />
      <label htmlFor="name">Email *</label>
      <input name="email" type="email" />
      <button>Submit</button>
    </form>
  );
};
