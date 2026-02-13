"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useState } from "react";

const photos = [
  { src: "/photos/1.jpeg", height: 400 },
  { src: "/photos/2.jpeg", height: 300 },
  { src: "/photos/3.jpeg", height: 450 },
  { src: "/photos/4.jpeg", height: 350 },
  { src: "/photos/5.jpeg", height: 500 },
  { src: "/photos/6.jpeg", height: 320 },
  { src: "/photos/7.jpeg", height: 380 },
  { src: "/photos/8.jpeg", height: 420 },
  { src: "/photos/9.jpeg", height: 360 },
  { src: "/photos/10.jpeg", height: 480 },
  { src: "/photos/11.jpeg", height: 340 },
  { src: "/photos/12.jpeg", height: 460 },
  { src: "/photos/13.jpeg", height: 390 },
];

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
};

export default function PhotoGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4 p-4"
        columnClassName="flex flex-col gap-4 [&>*]:pointer-events-auto"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer pointer-events-auto" // Add pointer-events-auto
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{
              opacity: hoveredIndex === index ? 1 : 0.7,
              scale: 1,
              rotate: 0,
            }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -2, 2, 0],
              opacity: 1,
              zIndex: 50,
              transition: {
                scale: { duration: 0.3 },
                rotate: { duration: 0.5, repeat: Infinity },
              },
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            onMouseEnter={() => {
              console.log("Hovered:", index);
              setHoveredIndex(index);
            }} // Changed from onHoverStart
            onMouseLeave={() => setHoveredIndex(null)} // Changed from onHoverEnd
            onTouchStart={() => setHoveredIndex(index)} // For mobile
            onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 800)} // For mobile
          >
            <div
              className="relative w-full overflow-hidden rounded-lg"
              style={{ height: `${photo.height}px` }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={photo.src}
                  alt={`Memory ${index + 1}`}
                  fill
                  sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  className="object-cover shadow-lg transition-all duration-300 group-hover:shadow-2xl"
                  unoptimized
                />
              </motion.div>

              {/* Animated overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent"
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating hearts on hover/tap */}
              {hoveredIndex === index && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl pointer-events-none"
                      initial={{
                        bottom: "50%",
                        left: "50%",
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        bottom: "100%",
                        left: `${30 + i * 10}%`,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      💕
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </Masonry>

      {/* Dark overlay on top of photos but below hearts/text */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-pink-600/20 to-black/50 pointer-events-none" />
    </div>
  );
}
