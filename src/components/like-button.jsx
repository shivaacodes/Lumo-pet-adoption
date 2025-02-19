"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LikeButton = ({ onClick, disabled }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <motion.div
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Heart
          size={32}
          className="text-gray-400 hover:text-red-500 hover:fill-red-500 transition-colors duration-300"
        />
      </motion.div>
    </motion.button>
  );
};

export default LikeButton;
