import React from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoFormatSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (format) => {
    navigate('/photo/booth', { state: { format } });
  };

  return (
    <div className="home-container">
      <div className="format-select">
        <h2>Choose Format</h2>
        <button onClick={() => handleSelect('portrait')}>Portrait</button>
        <button onClick={() => handleSelect('landscape')}>Landscape</button>
        <button onClick={() => handleSelect('square')}>Square</button>
      </div>
    </div>
  );
};

export default PhotoFormatSelect;
