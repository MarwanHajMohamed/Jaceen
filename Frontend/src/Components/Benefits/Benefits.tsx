import "./benefits.css";
import Benefit from "../Common Components/Benefit/Benefit";

import Natural from "../../assets/natural.png";
import Organic from "../../assets/organic.png";
import Shipped from "../../assets/shipped.png";

export default function Benefits() {
  return (
    <div className="benefits-container">
      <div className="title-container">
        <div className="title">Benefits</div>
        <div className="description">What makes us different?</div>
      </div>
      <div className="benefits">
        <Benefit
          img={Natural}
          title="100% Natural Ingredients"
          description="All of our products are free from chemicals, parabens and other synthetic ingredients"
        />
        <Benefit
          img={Organic}
          title="Organic Ingredients"
          description="We aim to provide maximal quality in our products by using mostly organic ingredients"
        />
        <Benefit
          img={Shipped}
          title="Free UK Shipping"
          description="Free delivery within the UK on all orders above £60"
        />
      </div>
    </div>
  );
}
