// frontend/components/features/AudioPlayer.tsx
"use client";

import { useStore } from "@/lib/store";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AudioPlayer() {
  const { isMuted, toggleMute } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.play().catch((err) => {
          console.log("Autoplay still blocked:", err);
        });
      }
    };

    // 1. Attempt to play immediately on load
    playAudio();

    // 2. Browser Autoplay Workaround: 
    // Start music on the very first user interaction with the page
    const unlockAudio = () => {
      playAudio();
      // Remove listeners after first interaction to save performance
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    window.addEventListener("scroll", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
    };
  }, [isMuted]);

  // Handle Mute/Unmute toggle from the store
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/shehnai_bgm.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm border border-mauli-gold active:scale-95 transition-transform"
        aria-label={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-gray-400" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Volume2 className="h-5 w-5 text-wedding-royal z-10" />
            <span className="absolute h-full w-full rounded-full bg-wedding-royal/20 animate-ping" />
          </div>
        )}
      </button>
    </>
  );
}