import React, { useEffect, useRef, useState } from "react";

const filters = {
  none: "",
  bw: "grayscale(100%)",
  sepia: "sepia(100%)",
  rainbow: "hue-rotate(90deg)",
  glitch: "contrast(200%) brightness(150%)",
};

const VideoPage = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [filter, setFilter] = useState("none");
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        setRecordedVideo(URL.createObjectURL(blob));
      };
    });
  }, []);

  const startRecording = () => {
    setRecordedVideo(null);
    setRecording(true);
    mediaRecorderRef.current.start();
    setTimeout(() => {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }, 5000); // Record for 5 seconds
  };

  return (
    <div className="booth-container">
      <h2>🎥 Video Booth</h2>
      <video className="video" ref={videoRef} autoPlay style={{ filter: filters[filter] }}></video>
      <div>
        {Object.keys(filters).map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <button onClick={startRecording} disabled={recording}>
        {recording ? "Recording..." : "Start Recording"}
      </button>
      {recordedVideo && (
        <div>
          <h3>Recorded Video:</h3>
          <video src={recordedVideo} controls width="300" />
          <a href={recordedVideo} download="recording.mp4">
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
