// src/components/HeaderText.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function HeaderText({ onContinue }) {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-black">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="text-5xl md:text-7xl font-bold"
        style={{ fontFamily: "Lobster" }}
      >
        BooBoo's 23 Phases
      </motion.h1>

      {showArrow && (
        <motion.button
          onClick={onContinue}
          className="mt-8 text-black animate-bounce"
        >
          <ChevronRight size={48} />
        </motion.button>
      )}
    </div>
  );
}
