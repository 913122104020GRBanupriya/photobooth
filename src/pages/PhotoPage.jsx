import React, { useRef, useEffect, useState } from "react";

const filters = {
  none: "",
  bw: "grayscale(100%)",
  sepia: "sepia(100%)",
  rainbow: "hue-rotate(90deg)",
  glitch: "contrast(200%) brightness(150%)",
};

const PhotoPage = () => {
  const videoRef = useRef(null);
  const [filter, setFilter] = useState("none");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const capturePhoto = () => {
    if (photos.length >= 3) return;

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    ctx.filter = filters[filter];
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    setPhotos([...photos, dataUrl]);
  };

  const downloadStrip = () => {
    const canvas = document.createElement("canvas");
    canvas.width = photos.length * 300;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        ctx.drawImage(img, index * 300, 0, 300, 400);
        if (index === photos.length - 1) {
          const link = document.createElement("a");
          link.download = "photostrip.png";
          link.href = canvas.toDataURL();
          link.click();
        }
      };
    });
  };

  return (
    <div className="booth-container">
      <h2>📸 Photo Booth</h2>
      <video className="video" ref={videoRef} autoPlay style={{ filter: filters[filter] }}></video>
      <div>
        {Object.keys(filters).map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <button onClick={capturePhoto}>Capture</button>
      {photos.length > 0 && (
        <div>
          <h3>Captured Strip:</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {photos.map((src, index) => (
              <img key={index} src={src} width="100" alt={`photo-${index}`} />
            ))}
          </div>
          <button onClick={downloadStrip}>Download Strip</button>
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
