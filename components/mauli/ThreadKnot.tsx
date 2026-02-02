"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ThreadKnotProps {
  className?: string;
}

export default function ThreadKnot({ className }: ThreadKnotProps) {
  return (
    <div className={cn("relative z-10 flex items-center justify-center py-10", className)}>
      
      {/* 1. Deep Ambient Glow */}
      <div className="absolute w-32 h-32 bg-mauli-gold/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      
      {/* 2. Horizontal Decorative Connector */}
      <div className="absolute flex items-center justify-center w-full max-w-[260px] pointer-events-none">
        {/* Core Sacred Thread Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-mauli-red/40 to-transparent" />
        {/* Shimmering Gold Accent (Offset for depth) */}
        <div className="absolute h-[1px] w-3/4 bg-gradient-to-r from-transparent via-mauli-gold/50 to-transparent translate-y-[1px]" />
      </div>

      {/* 3. The Central Knot - Refined SVG */}
      <div className="relative group cursor-default">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-12 h-12 drop-shadow-[0_6px_12px_rgba(185,28,28,0.25)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gold/Yellow Silk Strand */}
            <path
              d="M50 22C60 22 68 30 68 45C68 60 50 78 50 78C50 78 32 60 32 45C32 30 40 22 50 22Z"
              fill="url(#goldSilkLuxe)"
              className="opacity-95"
            />
            {/* Sacred Red Strand */}
            <path
              d="M22 50C22 40 30 32 50 32C70 32 78 40 78 50C78 60 70 68 50 68C30 68 22 60 22 50Z"
              fill="url(#redSilkLuxe)"
              className="mix-blend-multiply opacity-90"
            />
            
            <defs>
              <radialGradient id="goldSilkLuxe" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 40) rotate(90) scale(45)">
                <stop offset="0%" stopColor="#FFF9E5" />
                <stop offset="30%" stopColor="#F2C94C" />
                <stop offset="100%" stopColor="#D4AF37" />
              </radialGradient>
              <linearGradient id="redSilkLuxe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4D4D" />
                <stop offset="50%" stopColor="#B91C1C" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* 4. Divine Shimmer Sparkle */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]" 
          />
        </div>
      </div>

      {/* 5. Tapered Thread Tails (Desktop) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 w-[240px] pointer-events-none -z-10">
        <div className="flex justify-between items-center">
          <ThreadTail side="left" />
          <ThreadTail side="right" />
        </div>
      </div>
    </div>
  );
}

function ThreadTail({ side }: { side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ rotate: side === "left" ? -10 : 10, opacity: 0 }}
      whileInView={{ opacity: 0.4 }}
      animate={{ 
        rotate: side === "left" ? [-9, -11, -9] : [9, 11, 9],
        x: side === "left" ? [0, -3, 0] : [0, 3, 0] 
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "w-16 h-[1px]",
        side === "left" 
          ? "bg-gradient-to-r from-transparent via-mauli-gold/50 to-mauli-gold origin-right" 
          : "bg-gradient-to-l from-transparent via-mauli-gold/50 to-mauli-gold origin-left"
      )}
    />
  );
}