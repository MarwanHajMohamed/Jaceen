import { FormControl, TextField } from "@mui/material";
import "./newproductpage.css";
import { useState } from "react";
import RichTextEditor from "../../../Components/Common Components/RichTextEditor/RichTextEditor";
import { addNewProduct } from "../../../api/productsApi";
import { NewProduct } from "../../../Context/Product";

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

  const productData: NewProduct = {
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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files are selected
    const files = e.target.files;
    if (files) {
      // Convert the FileList to an array and update the state
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

  const addProduct = async () => {
    try {
      const response = await addNewProduct(productData, images);

      console.log("Added new product: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-product-container">
      <h3 className="new-product-title">New Product</h3>
      <FormControl className="form">
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
                      onClick={() => handleDeleteImage(index)} // Call the delete handler on click
                    ></i>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className="add" onClick={addProduct}>
          Add new product
        </button>
      </FormControl>
    </div>
  );
}
