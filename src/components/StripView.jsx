import React from "react";
import "../App.css";

const StripView = ({ images, onReshoot }) => {
  const downloadStrip = () => {
    const link = document.createElement("a");
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480 * images.length;
    const ctx = canvas.getContext("2d");

    images.forEach((img, i) => {
      const image = new Image();
      image.src = img;
      ctx.drawImage(image, 0, 480 * i, 640, 480);
    });

    canvas.toBlob((blob) => {
      link.href = URL.createObjectURL(blob);
      link.download = "photo-strip.png";
      link.click();
    });
  };

  return (
    <div className="strip-view">
      <h2>Your Photo Strip 🎞️</h2>
      <div className="strip-container">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`snap-${i}`} className="strip-img" />
        ))}
      </div>
      <button onClick={onReshoot}>🔄 Reshoot</button>
      <button onClick={downloadStrip}>⬇️ Download Strip</button>
    </div>
  );
};

export default StripView;
