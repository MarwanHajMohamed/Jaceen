import "./landing.css";

import BestSellers from "../../Components/Best Sellers/BestSellers";
import Benefits from "../../Components/Benefits/Benefits";
import Shop from "../../Components/Landing Shop/Shop";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Testimonials from "../../Components/Testimonials/Testimonials";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Landing() {
  const route: NavigateFunction = useNavigate();
  return (
    <>
      <div className="landing-container">
        <div className="products-container">
          <ParallaxProvider>
            <Parallax speed={-10}>
              <div
                style={{
                  height: "100vh",
                  backgroundImage: "url('src/assets/protein_powder.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Parallax>
          </ParallaxProvider>
        </div>
        <div className="title-container">
          <div className="title">Jaceen</div>
          <div className="description">Excellence in health</div>
          <button onClick={() => route("/shop/All")}>Shop all</button>
        </div>
      </div>
      <BestSellers />
      <Benefits />
      <Shop />
      <Testimonials />
    </>
  );
}
