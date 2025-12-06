// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import coin from "../assets/coin.png";

const Home = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleCoinClick = () => {
    setShowDialog(true);
  };

  const handleChoice = (choice) => {
    setShowDialog(false);
    if (choice === "photo") {
      navigate("/photo");
    } else if (choice === "video") {
      navigate("/video");
    }
  };

  return (
    <div className="home-container">
      <img
        src={coin}
        alt="coin"
        className="coin"
        onClick={handleCoinClick}
      />

      {showDialog && (
        <div className="custom-dialog">
          <div className="dialog-box">
            <p>What do you want to capture?</p>
            <button onClick={() => handleChoice("photo")}>📷 Photo</button>
            <button onClick={() => handleChoice("video")}>🎥 Video</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
