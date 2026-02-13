"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const photos = [
  {
    src: "/photos/1.jpeg",
    height: 250,
    message: "Your smile lights up my entire world 🌟",
  },
  {
    src: "/photos/2.jpeg",
    height: 200,
    message: "Every moment with you feels like a dream 💭",
  },
  {
    src: "/photos/3.jpeg",
    height: 280,
    message: "You make my heart skip a beat every single time 💓",
  },
  {
    src: "/photos/4.jpeg",
    height: 220,
    message: "Your kindness is the most beautiful thing about you 🌸",
  },
  {
    src: "/photos/5.jpeg",
    height: 300,
    message: "I fall in love with you more each day 🌙",
  },
  {
    src: "/photos/6.jpeg",
    height: 210,
    message: "You are my sunshine on cloudy days ☀️",
  },
  {
    src: "/photos/7.jpeg",
    height: 240,
    message: "Your laughter is my favorite sound 🎵",
  },
  {
    src: "/photos/8.jpeg",
    height: 260,
    message: "Being with you feels like coming home 🏡",
  },
  {
    src: "/photos/9.jpeg",
    height: 230,
    message: "You're the reason I believe in love 💝",
  },
  {
    src: "/photos/10.jpeg",
    height: 290,
    message: "My life became beautiful the day I met you 🦋",
  },
  {
    src: "/photos/11.jpeg",
    height: 220,
    message: "You are my forever and always 💕",
  },
  {
    src: "/photos/12.jpeg",
    height: 270,
    message: "Every picture of you is my favorite 📸",
  },
  {
    src: "/photos/13.jpeg",
    height: 240,
    message: "You are absolutely gorgeous, inside and out ✨",
  },
  // Add 7 more when ready:
  // { src: "/photos/14.jpeg", height: 250, message: "..." },
  // { src: "/photos/15.jpeg", height: 210, message: "..." },
  // ... up to 20
];

const breakpointColumns = {
  default: 5, // Desktop: 5 columns
  1100: 4, // Tablet landscape: 4 columns
  700: 3, // Tablet portrait: 3 columns
  500: 3, // Mobile: 3 columns (was 2)
};

export default function PhotoGrid() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className="w-full min-h-screen ">
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
              animate={{
                opacity: hoveredIndex === index ? 1 : 0.7,
                scale: 1,
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                opacity: 1,
                zIndex: 50,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedPhoto(index)}
            >
              <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{ height: `${photo.height}px` }}
              >
                <Image
                  src={photo.src}
                  alt={`Memory ${index + 1}`}
                  fill
                  sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  className="object-cover shadow-lg transition-all duration-300 group-hover:shadow-2xl"
                  unoptimized
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-300" />

                {/* Tap hint on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                >
                  <p className="text-white font-semibold text-lg drop-shadow-lg">
                    Tap to see message 💕
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-pink-600/20 to-black/50 pointer-events-none" />
      </div>

      {/* Message Dialog */}
      <Dialog
        open={selectedPhoto !== null}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pink-50 to-red-50 border-pink-200">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
              A Message For You 💕
            </DialogTitle>
          </DialogHeader>

          {selectedPhoto !== null && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg bg-gray-100">
                <Image
                  src={photos[selectedPhoto].src}
                  alt="Selected memory"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-800 text-xl font-medium leading-relaxed text-center px-4 py-6"
              >
                {photos[selectedPhoto].message}
              </motion.p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
