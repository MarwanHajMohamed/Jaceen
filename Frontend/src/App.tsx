import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Pages/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop/Shop";
import ScrollToTop from "./Components/ScrollToTop";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute route="">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute route="">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
