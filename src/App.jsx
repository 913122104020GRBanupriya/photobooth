import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PhotoPage from "./pages/PhotoPage";
import VideoPage from "./pages/VideoPage";
import coin from "./assets/coin.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>🎉 Welcome to the PhotoBooth 🎉</h1>
      <p>Click the coin to get started!</p>
      <img
        src={coin}
        alt="coin"
        className="coin"
        onClick={() => {
          const choice = confirm("Want to take a photo? Click Photo.\nWant to take a video? Click Video.");
          navigate(choice ? "/photo" : "/video");
        }}
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo" element={<PhotoPage />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
