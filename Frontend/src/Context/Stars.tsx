import { useState } from "react";

export const renderStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i className="fa-solid fa-star"></i>);
    } else {
      stars.push(<i className="fa-regular fa-star"></i>);
    }
  }
  return stars;
};

export const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (value: number) => void;
}) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fa-star ${
            star <= (hover || rating) ? "fa-solid" : "fa-regular"
          }`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(star)}
          style={{ cursor: "pointer", marginRight: "1px" }}
        ></i>
      ))}
    </div>
  );
};
