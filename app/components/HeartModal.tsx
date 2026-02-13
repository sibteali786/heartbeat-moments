"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HeartModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: string;
  image?: string;
}

export default function HeartModal({
  isOpen,
  onClose,
  reason,
  image,
}: HeartModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-pink-50 to-red-50 border-pink-200 p-4">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
            Why I Love You 💕
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {image && (
            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
              <Image src={image} alt="Memory" fill className="object-cover" />
            </div>
          )}

          <p className="text-gray-700 text-base leading-relaxed text-center px-2">
            {reason}
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
