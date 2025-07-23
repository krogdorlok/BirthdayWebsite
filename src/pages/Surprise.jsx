import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Surprise = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <Confetti width={width} height={height} />
      <div className="text-center z-10">
        <h1 className="text-5xl font-bold mb-4 animate-bounce">
          Happy 23rd Birthday, BooBoo! 🎈
        </h1>
        <p className="text-2xl mb-8">Here's a special message just for you.</p>
        {/* You can replace this with an actual video */}
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
      </div>
    </div>
  );
};

export default Surprise;
