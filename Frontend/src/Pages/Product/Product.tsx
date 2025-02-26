import { useParams } from "react-router-dom";
import { products } from "../../data/products";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  img: string;
}

export default function Product() {
  const { productID } = useParams();

  console.log("Params Product ID:", productID);
  console.log("Available Products:", products);

  // Convert productID to a number for accurate comparison
  const product = products.find((p) => p.id === Number(productID));

  console.log("Matched Product:", product);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-page-container">
      <h1>{product.title}</h1>
      <img src={product.img} alt={product.title} />
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}
