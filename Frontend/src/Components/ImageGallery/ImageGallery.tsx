export default function ImageGallery({
  images,
  currImg,
  setCurrImg,
}: {
  images: string[];
  currImg: string;
  setCurrImg: (img: string) => void;
}) {
  return (
    <div className="product-images">
      {images.map((img) => (
        <img
          key={img}
          className={currImg === img ? "active" : ""}
          src={img}
          alt=""
          onClick={() => setCurrImg(img)}
        />
      ))}
    </div>
  );
}
