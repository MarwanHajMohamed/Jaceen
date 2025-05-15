import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Location } from "react-router-dom";
import { ProductContext, reviews } from "../../Context/Product";
import { AddReview, GetReviews } from "../../Context/Review/Review";
import { CartContext } from "../../Context/Cart";
import { getProductBySlug } from "../../api/productsApi";
import { getReviews } from "../../api/reviewsApi";
import ReusablePagination from "../../Components/Common Components/Pagination/Pagination";
import ExpandableMarkdown from "../../Components/ExpandableMarkdown/ExpandableMarkdown";
import ImageGallery from "../../Components/ImageGallery/ImageGallery";
import ProductInfo from "../../Components/ProductInfo/ProductInfo";
import "./product.css";

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const location: Location<any> = useLocation();
  const { addToCart } = useContext(CartContext)!;

  const [product, setProduct] = useState<ProductContext | undefined>();
  const [currImg, setCurrImg] = useState<string>("");
  const [reviews, setReviews] = useState<reviews[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [expandedSection, setExpandedSection] = useState<string>("description");

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug).then((res) => {
        setProduct(res);
        setCurrImg(res.imgs[0]);
      });
    }
  }, [slug]);

  useEffect(() => {
    const fetchReviews: () => Promise<void> = async () => {
      if (product?._id) {
        try {
          const { data } = await getReviews(product._id.toString());
          setReviews(data);
        } catch (error) {
          if (error === "") console.error("Error fetching reviews:", error);
          setReviews([]);
        }
      }
    };

    fetchReviews();
  }, [product]);

  useEffect(() => {
    setTimeout(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 300);
  }, [location]);

  if (!product)
    return <div className="product-not-found">Product not found</div>;

  const cartItem = {
    _id: product._id,
    img: product.imgs[0],
    name: product.name,
    slug: product.slug,
    price: product.price,
    quantity,
  };

  const toggleExpand = (key: string) =>
    setExpandedSection((prev) => (prev === key ? "" : key));

  const addSubtractItems = (action: string) =>
    setQuantity((prev) =>
      action === "add" ? prev + 1 : Math.max(prev - 1, 0)
    );

  return (
    <div className="product-page-container">
      <div className="wrapper">
        <div className="top">
          <div className="left-side">
            <ImageGallery
              images={product.imgs}
              currImg={currImg}
              setCurrImg={setCurrImg}
            />
            <div className="display-product">
              <img src={currImg} alt={product.name} />
            </div>
          </div>
          <div className="right-side">
            <ProductInfo
              name={product.name}
              price={product.price}
              category={product.category}
              quantity={quantity}
              addSubtractItems={addSubtractItems}
              addToCartHandler={() => addToCart(cartItem, quantity)}
            />
            {product.description && (
              <ExpandableMarkdown
                title="Description"
                sectionKey="description"
                content={product.description}
                expandedSection={expandedSection}
                toggleExpand={toggleExpand}
              />
            )}
            {product.why_jaceen && (
              <ExpandableMarkdown
                title="Why Jaceen"
                sectionKey="why_jaceen"
                content={product.why_jaceen}
                expandedSection={expandedSection}
                toggleExpand={toggleExpand}
              />
            )}
            {product.product_highlights && (
              <ExpandableMarkdown
                title="Product Highlights"
                sectionKey="product_highlights"
                content={product.product_highlights}
                expandedSection={expandedSection}
                toggleExpand={toggleExpand}
              />
            )}
            {product.how_to_use && (
              <ExpandableMarkdown
                title="How to Use"
                sectionKey="how_to_use"
                content={product.how_to_use}
                expandedSection={expandedSection}
                toggleExpand={toggleExpand}
              />
            )}
            {product.ingredients && (
              <ExpandableMarkdown
                title="Ingredients"
                sectionKey="ingredients"
                content={product.ingredients}
                expandedSection={expandedSection}
                toggleExpand={toggleExpand}
              />
            )}
          </div>
        </div>
        <div className="bottom">
          <h3>Reviews ({reviews.length})</h3>
          <div className="review-container" id="reviews">
            <ReusablePagination
              items={reviews}
              itemsPerPage={5}
              renderItem={(review) => <GetReviews {...review} />}
              emptyMessage="Be the first to leave a review on this product!"
              className="reviews-pagination"
            />
          </div>
          <AddReview productId={product._id} />
        </div>
      </div>
    </div>
  );
}
