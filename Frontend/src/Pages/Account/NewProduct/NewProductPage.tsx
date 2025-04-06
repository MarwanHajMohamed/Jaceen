import { TextField } from "@mui/material";
import "./newproductpage.css";
import { FormEvent, useState } from "react";
import RichTextEditor from "../../../Components/Common Components/RichTextEditor/RichTextEditor";
import { addNewProduct } from "../../../api/productsApi";
import { NewProduct } from "../../../Context/Product";
import TurndownService from "turndown";
import { useNavigate } from "react-router-dom";

export default function NewProductPage() {
  // New product details
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
  const [images, setImages] = useState<File[]>([]);

  const [processing, setProcessing] = useState<boolean>(false);

  const route = useNavigate();

  const turndownService = new TurndownService();

  const productData: NewProduct = {
    category: category,
    countInStock: Number(stock),
    name: name,
    price: Number(price),
    slug: slug,
    description: turndownService.turndown(description),
    how_to_use: turndownService.turndown(howToUse),
    ingredients: turndownService.turndown(ingredients),
    product_highlights: turndownService.turndown(productHighlights),
    why_jaceen: turndownService.turndown(whyJaceen),
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

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

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setProcessing(true);
      await addNewProduct(productData, images);
      route("/account/new-product/success", {
        state: {
          name: name,
          price: price,
          category: category,
          stock: stock,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setProcessing(false);
  };

  return (
    <div className="new-product-container">
      <h3 className="new-product-title">New Product</h3>
      <form onSubmit={addProduct} className="form">
        <div className="form-section">
          <div className="row">
            <TextField
              variant="standard"
              label="Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
            <TextField
              variant="standard"
              label="Price"
              type="text"
              required
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
              required
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
        <div className="form-section">
          <div>Upload Images</div>
          <TextField
            variant="standard"
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleImageChange}
          />
          {images.length > 0 && (
            <div>
              <h4>Uploaded Images:</h4>
              <ul>
                {images.map((image, index) => (
                  <div className="images" key={index}>
                    <li>{image.name}</li>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => handleDeleteImage(index)}
                    ></i>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit" className="add">
          {!processing ? "Add new product" : "Processing..."}
        </button>
      </form>
    </div>
  );
}
