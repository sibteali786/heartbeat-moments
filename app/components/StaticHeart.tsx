"use client";

import { motion } from "framer-motion";
import { Heart as HeartIcon } from "lucide-react";

interface StaticHeartProps {
  index: number;
  onClick: () => void;
  isSpecial?: boolean;
}

export default function StaticHeart({
  index,
  onClick,
  isSpecial = false,
}: StaticHeartProps) {
  const positions = [
    { top: "15%", left: "20%" },
    { top: "25%", left: "70%" },
    { top: "35%", left: "30%" },
    { top: "45%", left: "80%" },
    { top: "55%", left: "15%" },
    { top: "65%", left: "60%" },
    { top: "75%", left: "40%" },
    { top: "20%", left: "50%" },
    { top: "40%", left: "65%" },
    { top: "60%", left: "25%" },
    { top: "70%", left: "75%" },
    { top: "30%", left: "85%" },
    { top: "50%", left: "10%" },
    { top: "60%", left: "50%" }, // Golden heart - center
  ];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        scale: { delay: index * 0.1, duration: 0.5 },
        y: {
          duration: 2,
          repeat: Infinity,
          delay: index * 0.2,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
      className="absolute cursor-pointer z-20"
      style={positions[index]}
      onClick={onClick}
    >
      <HeartIcon
        className={`${isSpecial ? "w-10 h-10 fill-yellow-400 text-yellow-500" : "w-8 h-8 fill-red-500 text-red-600"} 
        drop-shadow-2xl`}
        strokeWidth={2}
      />
    </motion.div>
  );
}
