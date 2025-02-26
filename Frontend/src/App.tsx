import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Pages/Landing/Landing";
import Footer from "./Components/Footer/Footer";
import Category from "./Components/Category/Category";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/shop/:category" element={<Category />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
