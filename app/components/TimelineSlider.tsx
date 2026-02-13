"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  date: string;
  description: string;
  media?: string;
  mediaType?: "image" | "video";
}

interface TimelineSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const events: TimelineEvent[] = [
  {
    date: "April 13, 2024",
    description:
      "We got engaged. It was the most confusing day of my life - I was nervous. Since it was an arranged marriage, I didn't know you yet.",
  },
  {
    date: "April 14, 2024",
    description:
      "Our first WhatsApp conversation. I was hesitant and nervous about how you'd react, but you were nice and sweet. We shared our hobbies, education, dreams. You mentioned you loved taking pictures.",
  },
  {
    date: "April 18, 2024 at 11:27 PM",
    description:
      "I said 'I Love You' for the first time. It was emotional for me - I fell in love with you in that first week. Maybe it was attraction, but I said it. We were both shocked and emotional.",
  },
  {
    date: "May 4, 2024 at 10:47 PM",
    description:
      "You shared your first unfiltered picture. You looked gorgeous and I fell in love all over again. I named it 'My Life' on my Mac.",
    media: "/timeline/first-unfiltered.jpeg",
    mediaType: "image",
  },
  {
    date: "May 13, 2024",
    description:
      "I wanted to surprise you with flowers when you came back from university, but ran into a scam. You got upset because it was your first request and I failed. I tried my best to make you believe it wasn't completely my fault.",
  },
  {
    date: "June 8, 2024",
    description:
      "We went to your home in our village. You made a video of me talking with your father from the window - you were watching me but I couldn't see you.",
    media: "/timeline/village-video.mp4",
    mediaType: "video",
  },
  {
    date: "July 12, 2024 at 4:34 PM",
    description:
      "We met for the first time. You held my hand and I was nervous, happy, and everything in between. That feeling...",
    media: "/timeline/first-meeting.jpeg",
    mediaType: "image",
  },
  {
    date: "September 11, 2024 at 2:00 PM",
    description:
      "We met again. This time you touched my arm while we stood together for a picture. It was one of the best moments of my life.",
    media: "/timeline/second-meeting.jpeg",
    mediaType: "image",
  },
  {
    date: "November 6, 2024 at 8:00 PM",
    description:
      "We celebrated my birthday (which was on October 19th). You were the one who made celebrations for me and fed me cake with your own hands...",
    media: "/timeline/birthday.jpeg",
    mediaType: "image",
  },
  {
    date: "December 14, 2024",
    description:
      "You came to my elder brother's marriage ceremony. I gave you a flower bouquet and your favourite sundae and cookies which made you so happy.",
    media: "/timeline/wedding-bouquet.jpeg",
    mediaType: "image",
  },
];

export default function TimelineSlider({
  isOpen,
  onClose,
}: TimelineSliderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === events.length;

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < events.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-2xl flex flex-col h-full max-h-[95vh]">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">
              {currentStep < events.length
                ? `${currentStep + 1} / ${events.length}`
                : "💕"}
            </span>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition text-2xl"
            >
              ✕
            </button>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-red-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / (events.length + 1)) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content - takes remaining space */}
        <div className="flex-1 flex items-center justify-center mb-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!isLastStep ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Card className="bg-linear-to-br from-pink-50 to-red-50 border-pink-200 p-6 md:p-8 mx-4">
                  <p className="text-red-600 font-semibold text-sm mb-4">
                    {events[currentStep].date}
                  </p>

                  {events[currentStep].media && (
                    <div className="mb-6">
                      {events[currentStep].mediaType === "image" ? (
                        <div className="relative w-full h-100 md:h-[450px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
                          <Image
                            src={events[currentStep].media!}
                            alt="Memory"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-lg bg-black">
                          <video
                            src={events[currentStep].media}
                            controls
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                    {events[currentStep].description}
                  </p>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="proposal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Card className="bg-linear-to-br from-yellow-50 via-pink-50 to-red-50 border-pink-300 p-8 md:p-12 text-center mx-4 relative overflow-hidden">
                  {/* Floating hearts animation */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        y: "100%",
                        x: `${Math.random() * 100}%`,
                        opacity: 0,
                      }}
                      animate={{
                        y: "-100%",
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Heart className="w-6 h-6 fill-red-400 text-red-400" />
                    </motion.div>
                  ))}

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex justify-center mb-6 relative z-10"
                  >
                    <Heart className="w-20 h-20 fill-red-500 text-red-500" />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-6 relative z-10">
                    Will You Be My Valentine? 💝
                  </h2>

                  <p className="text-gray-700 text-lg md:text-xl mb-8 relative z-10">
                    Every moment with you has been a blessing. I love you more
                    than words can say.
                  </p>

                  <div className="flex gap-4 justify-center relative z-10">
                    <Button
                      size="lg"
                      className="px-8 py-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold text-lg rounded-full shadow-lg"
                      onClick={onClose}
                    >
                      Yes! 💕
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation - centered at bottom */}
        <div className="flex justify-center gap-4 pb-4">
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            size="lg"
            variant="ghost"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-4 disabled:opacity-30"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === events.length}
            size="lg"
            variant="ghost"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-4 disabled:opacity-30"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
