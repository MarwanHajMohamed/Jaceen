import "./shop.css";
import Category from "../Common Components/Category/Category";

import hairCare from "../../assets/hair-care.jpeg";
import skinCare from "../../assets/skin-care.jpeg";
import sportsNutrition from "../../assets/shilajit.jpg";
import training from "../../assets/training-programmes.jpeg";

export default function Shop() {
  return (
    <div className="landing-shop-container">
      <div className="container">
        <div className="title-container">
          <div className="title">Shop</div>
          <div className="description">Browse our items by categories</div>
        </div>
        <div className="shop-items">
          <Category img={hairCare} title="Hair Care" />
          <Category img={skinCare} title="Skin Care" />
          <Category img={sportsNutrition} title="Sports Nutrition" />
          <Category img={training} title="Training Programmes" />
        </div>
        <div className="description-container">
          All our products are made from 100% natural and organic ingredients.
          We are vegan friendly and prioritise cruelty-free practices.
        </div>
      </div>
    </div>
  );
}
