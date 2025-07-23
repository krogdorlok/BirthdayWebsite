// src/App.jsx
import Home from "./pages/Home";
import Surprise from "./pages/Surprise"; // will do this later
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surprise" element={<Surprise />} />
      </Routes>
    </Router>
  );
}
