import "./landing.css";

import Logo from "../../assets/logo.jpg";

import BestSellers from "../../Components/Best Sellers/BestSellers";
import Benefits from "../../Components/Benefits/Benefits";
import Shop from "../../Components/Landing Shop/Shop";
import Testimonials from "../../Components/Testimonials/Testimonials";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Landing() {
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
          <div className="title-logo">
            <img src={Logo} alt="" />
            {/* <div className="title">Jaceen</div> */}
          </div>
          <div className="description">Excellence in health</div>
        </div>
      </div>
      <BestSellers />
      <Benefits />
      <Shop />
      <Testimonials />
    </>
  );
}
