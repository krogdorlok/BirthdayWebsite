import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const RealmCard = ({ realm, index }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/realm/${index + 1}`);
  };

  const isSpecial = index === 22;

  const getRandomPlaceholder = () => {
    const random = Math.random();
    return random < 0.5
      ? "/images/real/placeholder1.png"
      : "/images/real/placeholder2.png";
  };

  const placeholder = isSpecial
    ? "/images/real/special23.png"
    : getRandomPlaceholder();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="w-32 h-44 overflow-hidden shadow-md rounded-xl border-2 border-pink-300 bg-pink-50">
        <CardContent className="p-0 w-full h-full relative">
          <img
            src={placeholder}
            alt={`Realm ${index + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-0"
          />
          <img
            src={realm.image}
            alt={`Realm ${index + 1}`}
            className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute bottom-1 left-1 text-white text-sm font-bold bg-black bg-opacity-50 px-1.5 py-0.5 rounded">
            {index + 1}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RealmCard;
