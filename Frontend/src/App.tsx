import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Pages/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop/Shop";
import Product from "./Pages/Product/Product";
import Cart from "./Pages/Cart/Cart";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Checkout from "./Pages/Checkout/Checkout";
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess";
import Account from "./Pages/Account/Account";
import ScrollToTop from "./Components/ScrollToTop";

import { AccountProvider } from "./Context/AccountContext";

import UserProtectedRoute from "./Components/UserProtectedRoute";
import GuestProtectedRoute from "./Components/GuestProtectedRoute";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewProductPage from "./Pages/Account/NewProduct/NewProductPage";
import Success from "./Pages/Account/NewProduct/Success";
import EditProduct from "./Pages/Account/EditProduct/EditProduct";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            element={
              <UserProtectedRoute route="">
                <Register />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <UserProtectedRoute route="">
                <Login />
              </UserProtectedRoute>
            }
          />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/account"
            element={
              <GuestProtectedRoute route="">
                <AccountProvider>
                  <Account />
                </AccountProvider>
              </GuestProtectedRoute>
            }
          />
          <Route
            path="/account/new-product"
            element={
              <GuestProtectedRoute route="">
                <NewProductPage />
              </GuestProtectedRoute>
            }
          />
          <Route
            path="/account/new-product/success"
            element={
              <GuestProtectedRoute route="">
                <Success />
              </GuestProtectedRoute>
            }
          />
          <Route
            path="/account/edit-product/:id"
            element={
              <GuestProtectedRoute route="">
                <EditProduct />
              </GuestProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
