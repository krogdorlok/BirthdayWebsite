import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import realms from "../realms/Realmsdata";
import Card from "./Card";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const dragControls = useRef();

  const handleNext = () => {
    if (activeIndex < realms.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + realms.length) % realms.length);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl h-[500px] mx-auto">
        <motion.div
          ref={dragControls}
          className="flex items-center h-full"
          drag="x"
          dragConstraints={{ left: -((realms.length - 1) * 100), right: 0 }}
          style={{ x: `-${activeIndex * 100}%` }}
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          {realms.map((realm, index) => (
            <div
              key={realm.number}
              className="flex-shrink-0 w-full h-full px-8"
              onClick={() => {
                if (realm.isSpecial) {
                  navigate("/surprise");
                }
              }}
            >
              <Card realm={realm} isActive={index === activeIndex} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center gap-8 mt-8">
        <button
          onClick={handlePrev}
          className="bg-white/20 p-3 rounded-full text-white hover:bg-white/40 transition-colors"
        >
          <FiChevronLeft size={30} />
        </button>
        <button
          onClick={handleNext}
          className="bg-white/20 p-3 rounded-full text-white hover:bg-white/40 transition-colors"
          disabled={activeIndex === realms.length - 1}
        >
          <FiChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
