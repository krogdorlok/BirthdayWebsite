// src/pages/Home.jsx
import { useState, useEffect } from "react";
import HeaderText from "../components/HeaderText";
import Carousel from "../components/Carousel"; // placeholder
import backgroundVideo from "/assets/video1.mp4";

export default function Home() {
  const [startCarousel, setStartCarousel] = useState(false);
  const [headerFloating, setHeaderFloating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        setStartCarousel(true);
        setHeaderFloating(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Content */}
      <HeaderText
        onContinue={() => {
          setStartCarousel(true);
          setHeaderFloating(true);
        }}
        isFloating={headerFloating}
        showCarousel={startCarousel}
      />
      {startCarousel && (
        <div className="relative z-10 flex items-center justify-center h-full">
          <Carousel />
        </div>
      )}
    </div>
  );
}
