import "./landing.css";

import BestSellers from "../../Components/Best Sellers/BestSellers";
import Benefits from "../../Components/Benefits/Benefits";
import Shop from "../../Components/Landing Shop/Shop";
import Testimonials from "../../Components/Testimonials/Testimonials";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../api/productsApi";
import { useEffect } from "react";

export default function Landing() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["products", "All Products"],
      queryFn: getProducts,
      staleTime: 1000 * 60 * 5,
    });
  }, [queryClient]);

  return (
    <>
      <div className="landing-container">
        <div className="products-container">
          <ParallaxProvider>
            <Parallax speed={-10}>
              <div className="parallax-image" />
            </Parallax>
          </ParallaxProvider>
        </div>
      </div>
      <BestSellers />
      <Benefits />
      <Shop />
      <Testimonials />
    </>
  );
}
