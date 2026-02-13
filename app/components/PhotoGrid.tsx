"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";

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
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4 p-4"
        columnClassName="flex flex-col gap-4"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              opacity: 1,
              zIndex: 20,
              transition: { duration: 0.3 },
            }}
          >
            <div
              className="relative w-full"
              style={{ height: `${photo.height}px` }}
            >
              <Image
                src={photo.src}
                alt={`Memory ${index + 1}`}
                fill
                sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                className="object-cover rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl"
                unoptimized
              />
              <div className="absolute inset-0 bg-pink-500/20 rounded-lg group-hover:bg-transparent transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </Masonry>

      {/* Dark overlay on top of photos but below hearts/text */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-pink-900/40 to-black/50 pointer-events-none" />
    </div>
  );
}
