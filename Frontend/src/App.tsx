import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Landing from "./Pages/Landing/Landing";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
