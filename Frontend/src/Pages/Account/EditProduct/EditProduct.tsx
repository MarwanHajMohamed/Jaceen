import "./editproduct.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../api/productsApi";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id!);
        setProduct(fetchedProduct);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProduct(id!, product);
      navigate("/account/manage-products");
    } catch (err) {
      setError("Failed to update product");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return null;

  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="imgs"
        value={product.imgs?.[0]}
        onChange={(e) => setProduct({ ...product, imgs: [e.target.value] })}
        placeholder="Image URL"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        name="countInStock"
        type="number"
        value={product.countInStock}
        onChange={handleChange}
        placeholder="Stock"
      />
      <textarea
        name="why_jaceen"
        value={product.why_jaceen}
        onChange={handleChange}
        placeholder="Why Jaceen?"
      />
      <textarea
        name="how_to_use"
        value={product.how_to_use}
        onChange={handleChange}
        placeholder="How to use"
      />
      <textarea
        name="product_highlights"
        value={product.product_highlights}
        onChange={handleChange}
        placeholder="Highlights"
      />
      <textarea
        name="ingredients"
        value={product.ingredients}
        onChange={handleChange}
        placeholder="Ingredients"
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
