import "./bestsellers.css";
import Product from "../Common Components/Product/Product";

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
        <Product img={Alpha} title="Alpha" price={35} />
        <Product img={Growth} title="Growth" price={50} />
        <Product img={CBD} title="Organic CBD Oil" price={80} />
        <Product img={Shilajit} title="Pure Himalayan Shilajit" price={30} />
        <Product img={Energise} title="Energise" price={45} />
        <Product img={Immune} title="Immune" price={30} />
      </div>
    </div>
  );
}
