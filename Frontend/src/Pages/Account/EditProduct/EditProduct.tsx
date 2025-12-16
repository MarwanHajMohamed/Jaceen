import "./editproduct.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../api/productsApi";
import { TextField } from "@mui/material";
import RichTextEditor from "../../../Components/Common Components/RichTextEditor/RichTextEditor";
import { ProductContext } from "../../../Context/Product";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductContext>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [whyJaceen, setWhyJaceen] = useState<string>("");
  const [howToUse, setHowToUse] = useState<string>("");
  const [productHighlights, setProductHighlights] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  // const turndownService = new TurndownService();

  const productData: ProductContext = {
    category: category,
    countInStock: Number(stock),
    name: name,
    price: Number(price),
    slug: slug,
    description: description,
    how_to_use: howToUse,
    ingredients: ingredients,
    product_highlights: productHighlights,
    why_jaceen: whyJaceen,
  };

  if (id === undefined) {
    setError("Product not found");
    return;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id!);
        setProduct(fetchedProduct);

        setName(fetchedProduct.name);
        setPrice(String(fetchedProduct.price));
        setCategory(fetchedProduct.category);
        setStock(String(fetchedProduct.countInStock));
        setSlug(fetchedProduct.slug);
        setDescription(fetchedProduct.description || "");
        setWhyJaceen(fetchedProduct.why_jaceen || "");
        setHowToUse(fetchedProduct.how_to_use || "");
        setProductHighlights(fetchedProduct.product_highlights || "");
        setIngredients(fetchedProduct.ingredients || "");
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setPrice(value);
    }
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setStock(value);
    }
  };

  const handleSave = async () => {
    try {
      await updateProduct(id, productData);
      navigate("/account");
    } catch (err) {
      setError("Failed to update product");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return null;

  return (
    <div className="edit-product-form">
      <h3>Edit Product</h3>
      <form className="form">
        <div className="form-section">
          <div className="row">
            <TextField
              variant="standard"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
            <TextField
              variant="standard"
              label="Price"
              type="text"
              value={price}
              onChange={handlePriceChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form-section">
          <div className="row">
            <TextField
              variant="standard"
              label="Category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete="off"
            />
            <TextField
              variant="standard"
              label="Stock"
              type="text"
              required
              value={stock}
              onChange={handleStockChange}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="form-section">
          <TextField
            variant="standard"
            label="Slug"
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="form-section">
          <div>Description</div>
          <RichTextEditor state={description} setState={setDescription} />
        </div>
        <div className="form-section">
          <div>Why Jaceen</div>
          <RichTextEditor state={whyJaceen} setState={setWhyJaceen} />
        </div>
        <div className="form-section">
          <div>How to Use</div>
          <RichTextEditor state={howToUse} setState={setHowToUse} />
        </div>
        <div className="form-section">
          <div>Product Highlights</div>
          <RichTextEditor
            state={productHighlights}
            setState={setProductHighlights}
          />
        </div>
        <div className="form-section">
          <div>Ingredients</div>
          <RichTextEditor state={ingredients} setState={setIngredients} />
        </div>
      </form>
      <TextField
        variant="standard"
        name="imgs"
        value={product.imgs?.[0]}
        onChange={(e) => setProduct({ ...product, imgs: [e.target.value] })}
        placeholder="Image URL"
      />
      {/* <img src={product.imgs?.[0]} alt="" /> */}

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
