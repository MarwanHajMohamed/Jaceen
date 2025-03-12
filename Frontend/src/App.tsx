import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Pages/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop/Shop";
import ScrollToTop from "./Components/ScrollToTop";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:productTitle" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
