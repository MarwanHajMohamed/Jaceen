import { useState } from "react";
import { StarRating } from "./Stars";

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
