"use client";

import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Sparkles, Armchair, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function SadhaModeToggle() {
  const { isSadhaMode, toggleSadhaMode } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        {/* Animated Label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={isSadhaMode ? "sadha" : "fancy"}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={cn(
              "text-xs font-black hidden sm:block px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border transition-all uppercase tracking-widest",
              isSadhaMode 
                ? "bg-white text-wedding-maroon border-wedding-maroon/20" 
                : "bg-mauli-gold/10 text-mauli-gold border-mauli-gold/30"
            )}
          >
            {isSadhaMode ? "साधा मोड चालू" : "साधा मोड"}
          </motion.span>
        </AnimatePresence>

        {/* The Toggle Switch */}
        <button
          onClick={toggleSadhaMode}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={cn(
            "relative h-11 w-20 rounded-full shadow-lg transition-all duration-500 border-2 p-1",
            isSadhaMode 
              ? "bg-wedding-paper border-wedding-maroon/30"
              : "bg-gradient-to-r from-mauli-red to-mauli-gold border-white/50"
          )}
          aria-label="Toggle Simplified Mode"
        >
          {/* Subtle Glow (Fancy Mode Only) */}
          {!isSadhaMode && (
            <div className="absolute inset-0 rounded-full bg-mauli-gold/20 blur-md animate-pulse" />
          )}

          {/* Moving Knob */}
          <motion.div
            animate={{ x: isSadhaMode ? 36 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-xl",
              "transition-colors duration-300"
            )}
          >
            {isSadhaMode ? (
              <Armchair className="h-4 w-4 text-wedding-maroon" />
            ) : (
              <Sparkles className="h-4 w-4 text-mauli-red" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Contextual Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mr-2 px-3 py-2 bg-slate-900 text-white text-[10px] rounded-xl shadow-2xl pointer-events-none max-w-[150px] text-center leading-tight border border-white/10"
          >
            {isSadhaMode 
              ? "Animations and music are paused for comfort." 
              : "Switch here for a simpler, high-contrast view."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}