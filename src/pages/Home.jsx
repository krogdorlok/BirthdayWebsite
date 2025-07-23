// src/pages/Home.jsx
import { useState } from "react";
import HeaderText from "../components/HeaderText";
import Carousel from "../components/Carousel"; // placeholder
import backgroundVideo from "/assets/video1.mp4";

export default function Home() {
  const [startCarousel, setStartCarousel] = useState(false);

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
      {!startCarousel ? (
        <HeaderText onContinue={() => setStartCarousel(true)} />
      ) : (
        <div className="relative z-10 pt-20">
          <Carousel />
        </div>
      )}
    </div>
  );
}
