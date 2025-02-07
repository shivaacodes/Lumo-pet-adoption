"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.button
      onClick={() => setLiked(!liked)}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center p-3 rounded-full transition-all duration-300"
    >
      <motion.div
        animate={{ scale: liked ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Heart
          size={32}
          className={`transition-colors duration-300 ${
            liked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </motion.div>
    </motion.button>
  );
};

export default LikeButton;
