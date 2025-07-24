import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import backgroundVideo from "/assets/video1.mp4";

const Surprise = () => {
  const { width, height } = useWindowSize();
  const [candlesLit, setCandlesLit] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [micPermission, setMicPermission] = useState(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    const handleMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicPermission(true);
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          if (average > 100) {
            // Threshold for detecting a blow
            setCandlesLit(false);
            setTimeout(() => setShowVideo(true), 1000); // Fade out cake, then show video
            stream.getTracks().forEach((track) => track.stop());
          } else {
            requestAnimationFrame(detectBlow);
          }
        };
        detectBlow();
      } catch (err) {
        console.error("Microphone access denied:", err);
        setMicPermission(false);
      }
    };

    handleMic();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center font-transcity">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">
          Happy 23rd Birthday, BooBoo! 🎈
        </h1>
        {!showVideo && (
          <div className="flex flex-col items-center transition-opacity duration-1000">
            <img
              src={
                candlesLit
                  ? "/assets/images/cake-lit.png"
                  : "/assets/images/cake.png"
              }
              alt="Birthday Cake"
              className="w-64 h-64 mb-4"
            />
            <p className="text-4xl">Blow the candles!</p>
            {micPermission === false && (
              <p className="text-pink-500 mt-5">
                Ohhooo, mic access dedo bhai, then blow the candles, trust me!!
              </p>
            )}
          </div>
        )}
        {showVideo && (
          <>
            <Confetti width={width} height={height} />
            <p className="text-2xl mb-8">
              Here's a special message just for you.
            </p>
            <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-4">
              <video
                src="/assets/video1.mp4" // Placeholder for the final video
                controls
                autoPlay
                className="w-full rounded"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Surprise;
