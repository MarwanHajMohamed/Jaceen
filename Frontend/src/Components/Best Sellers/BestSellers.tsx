import "./bestsellers.css";
import Product from "../Common Components/Landing Product/Product";

import Alpha from "../../assets/alpha.png";
import CBD from "../../assets/cbd.jpg";
import Growth from "../../assets/growth.jpg";
import Shilajit from "../../assets/shilajit.jpg";
import Immune from "../../assets/immune.png";
import Energise from "../../assets/energise.png";

export default function BestSellers() {
  return (
    <div className="bestsellers-container">
      <div className="title-container">
        <div className="title">Best Sellers</div>
        <div className="description">
          Explore our best-selling products and find your new favourites
        </div>
      </div>
      <div className="products-container">
        <Product img={Alpha} name="Alpha" price={35} slug="alpha" />
        <Product img={Growth} name="Growth" price={50} slug="growth" />
        <Product
          img={CBD}
          name="Organic CBD Oil"
          price={80}
          slug="organic-cbd-balm"
        />
        <Product
          img={Shilajit}
          name="Pure Himalayan Shilajit"
          price={30}
          slug="pure-himalayan-shilajit-resin"
        />
        <Product img={Energise} name="Energise" price={45} slug="energise" />
        <Product img={Immune} name="Immune" price={30} slug="immune" />
      </div>
    </div>
  );
}
