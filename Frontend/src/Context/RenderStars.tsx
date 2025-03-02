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
