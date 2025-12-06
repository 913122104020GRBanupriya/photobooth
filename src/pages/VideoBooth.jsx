import React, { useRef, useState, useEffect } from 'react';

const VideoBooth = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [chunks, setChunks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('none');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) setChunks((prev) => [...prev, e.data]);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        setRecordedVideo(URL.createObjectURL(blob));
      };
    });
  }, []);

  const startRecording = () => {
    setChunks([]);
    mediaRecorderRef.current.start();
    setTimeout(() => {
      mediaRecorderRef.current.stop();
    }, 5000); // record 5 seconds
  };

  return (
    <div className="booth-container">
      <video ref={videoRef} autoPlay className="video" style={{ filter: currentFilter }} />
      <div style={{ marginTop: '15px' }}>
        <button onClick={() => setCurrentFilter('grayscale(100%)')}>Black & White</button>
        <button onClick={() => setCurrentFilter('sepia(100%)')}>Sepia</button>
        <button onClick={() => setCurrentFilter('hue-rotate(90deg)')}>Rainbow</button>
        <button onClick={() => setCurrentFilter('contrast(120%) brightness(90%)')}>Vintage</button>
        <button onClick={() => setCurrentFilter('invert(100%)')}>Glitch</button>
      </div>
      <button onClick={startRecording}>Start Recording</button>

      {recordedVideo && (
        <>
          <h4>Your Video</h4>
          <video src={recordedVideo} controls width="300" />
          <a href={recordedVideo} download="video.mp4">
            <button>Download</button>
          </a>
        </>
      )}
    </div>
  );
};

export default VideoBooth;
