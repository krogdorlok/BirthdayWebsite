import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Card = ({ realm, isActive }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        const photoTimer = setTimeout(() => {
          setShowPhoto(true);
          if (audioRef.current) {
            audioRef.current
              .play()
              .catch((e) => console.log("Audio play failed:", e));
          }
        }, 3000);
        return () => clearTimeout(photoTimer);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsRevealed(false);
      setShowPhoto(false);
    }
  }, [isActive]);

  return (
    <motion.div
      className="relative w-full h-full bg-black/50 rounded-2xl shadow-lg flex items-center justify-center text-white overflow-hidden"
      initial={{ scale: 0.8, opacity: 0.5 }}
      animate={{
        scale: isActive ? 1 : 0.8,
        opacity: isActive ? 1 : 0.5,
        boxShadow: isActive ? "0 0 20px 5px rgba(59, 130, 246, 0.5)" : "none",
      }}
      transition={{ duration: 0.5 }}
    >
      {!isRevealed && <div className="text-8xl font-bold">{realm.number}</div>}
      {isRevealed && (
        <>
          <motion.img
            src={realm.image}
            alt={realm.title}
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: showPhoto ? 0 : 1 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showPhoto ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-5xl font-bold mb-4 font-transcity">
              {realm.title}
            </h3>
            <p className="text-2xl mb-4 font-transcity">
              {realm.caption || realm.message}
            </p>
            {realm.audio && <audio ref={audioRef} src={realm.audio} controls />}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Card;
