import "./landing.css";

import BestSellers from "../../Components/Best Sellers/BestSellers";
import Benefits from "../../Components/Benefits/Benefits";
import Shop from "../../Components/Landing Shop/Shop";
import Testimonials from "../../Components/Testimonials/Testimonials";

import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../api/api";
import { useEffect } from "react";

export default function Landing() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch the "All Products" data when this component mounts
    queryClient.prefetchQuery({
      queryKey: ["products", "All Products"],
      queryFn: getProducts,
      staleTime: 1000 * 60 * 5, // Match your current staleTime
    });

    console.log(
      "Current React Query cache:",
      queryClient.getQueryCache().getAll()
    );
  }, [queryClient]);

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
      </div>
      <BestSellers />
      <Benefits />
      <Shop />
      <Testimonials />
    </>
  );
}
