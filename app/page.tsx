"use client";

import { useState } from "react";
import Heart from "./components/Heart";
import HeartModal from "./components/HeartModal";
import StaticHeart from "./components/StaticHeart";
import TimelineSlider from "./components/TimelineSlider";

const reasons = [
  "You are kind and treat your elders, family, and every friend with kindness - a remarkable quality I love about you.",
  "You have a good sense of humor and understand my jokes, which sets you apart from others I've met in the past.",
  "You are understanding and help me heal my wounds. You jump right onto a call if you feel something is wrong with me.",
  "You take care of me and buy things that matter. You gifted me a wallet with our engagement pictures engraved, a keychain with my name, and a black shawl because you heard me say I wanted one.",
  "You're bossy and boss me around, threatening to beat me or choke me if I do something against you in the future hahaha - it's quite funny!",
  "You try to remove my inferiority complex and secretly build my confidence, saying I'm a good person and that everything will be alright as I stress over family and career problems.",
  "You send me your pictures even when I don't ask, get ready for me, and call me 'Your Husband' when you're happy, of course.",
  "You are absolutely gorgeous. Your smile and your eyes are enough to melt my whole identity away along with my ego. I cannot resist your smile and your eyes.",
  "You want to travel the world, walk in the rain (which I love too!), enjoy snowy weather, and take lots of pictures of yourself enjoying life.",
  "You're like my mother - you take care of me and my needs even without me knowing it. You ask about my mood when it's off, call quickly, and make sure I go away happy.",
  "You're flirty and talk romantically when I do. You never hesitate to share your dark romance fantasies with me, which makes me happy as it signals you trust me.",
  "You pray for us to be more in love and prosper together.",
  "You understand why my career is important to me and why it matters, so you always help me focus on my work. When needed, you ask me to spend less time with you, but secretly want me to spend time with you - which I understand, of course.",
  "You get upset if I get angry sometimes, which I try my best to avoid, of course.",
];

export default function Home() {
  const [selectedHeart, setSelectedHeart] = useState<number | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          {Array.from({ length: 14 }).map((_, i) => (
            <StaticHeart
              key={i}
              index={i}
              onClick={() => setSelectedHeart(i)}
              isSpecial={i === 13}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-4">
            For My Love 💕
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
            Tap the hearts to discover why I love you
          </p>
          <p className="text-lg text-yellow-300 drop-shadow-lg mt-2 animate-pulse">
            ✨ Look for the golden heart ✨
          </p>
        </div>
      </div>

      <HeartModal
        isOpen={selectedHeart !== null && selectedHeart !== 13}
        onClose={() => setSelectedHeart(null)}
        reason={selectedHeart !== null ? reasons[selectedHeart] : ""}
      />

      {selectedHeart === 13 && (
        <TimelineSlider isOpen={true} onClose={() => setSelectedHeart(null)} />
      )}
    </div>
  );
}
