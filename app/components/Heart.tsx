"use client";

import { motion } from "framer-motion";
import { Heart as HeartIcon } from "lucide-react";

interface HeartProps {
  delay: number;
  onClick: () => void;
  isSpecial?: boolean;
}

export default function Heart({
  delay,
  onClick,
  isSpecial = false,
}: HeartProps) {
  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0, scale: 0 }}
      animate={{
        y: "-100vh",
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.8],
        rotate: [0, 15, -15, 0],
      }}
      whileTap={{ scale: 1.2 }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
      }}
      className="absolute cursor-pointer"
      style={{
        left: `${Math.random() * 80 + 10}%`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <HeartIcon
        className={`${isSpecial ? "w-16 h-16 fill-yellow-400 text-yellow-400" : "w-12 h-12 fill-red-500 text-red-500"} 
        hover:scale-110 transition-transform drop-shadow-lg`}
        strokeWidth={isSpecial ? 2 : 1.5}
      />
    </motion.div>
  );
}
