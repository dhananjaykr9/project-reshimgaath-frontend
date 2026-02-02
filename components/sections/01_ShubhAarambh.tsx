"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import { SHLOKAS, COUPLE } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useStore } from "@/lib/store";

export default function ShubhAarambh() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isSadhaMode } = useStore();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const yBackground = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    springConfig
  );
  const yText = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    springConfig
  );
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full flex flex-col items-center justify-between py-16 overflow-hidden px-4 select-none"
    >
      {/* 1. Cinematic Background Layer */}
      <motion.div
        style={{
          y: isSadhaMode ? 0 : yBackground,
          scale: isSadhaMode ? 1.1 : bgScale,
        }}
        className="absolute inset-0 -z-20 h-[120%] w-full"
      >
        <img
          src="/images/hero/hero.jpg"
          alt="Wedding Background"
          className="w-full h-full object-cover opacity-60 blur-[0.5px]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-wedding-paper/20 to-wedding-paper/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-wedding-paper via-transparent to-wedding-paper z-20" />
      </motion.div>

      {/* 2. Divine Invocation (Top) */}
      <motion.div
        style={{
          y: isSadhaMode ? 0 : yText,
          opacity: isSadhaMode ? 1 : opacityFade,
        }}
        className="z-30 flex flex-col items-center space-y-2 mt-12"
      >
        {/* Ganpati PNG — Added Floating & Glow Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            y: [0, -10, 0], // Floating effect
            filter: ["drop-shadow(0 0 0px rgba(255,215,0,0))", "drop-shadow(0 0 15px rgba(255,215,0,0.4))", "drop-shadow(0 0 0px rgba(255,215,0,0))"] // Glowing effect
          }}
          transition={{ 
            initial: { duration: 1.5, type: "spring", bounce: 0.4 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="flex items-center justify-center"
        >
          <img
            src="/images/ganpati.png"
            alt="Ganpati"
            className="w-24 h-24 object-contain"
            loading="eager"
          />
        </motion.div>

        {/* Shloka Text — Size reduced to lg */}
        <ShlokaText
          text={SHLOKAS.ganesh}
          size="lg"
          className="text-mauli-red drop-shadow-xl font-medium tracking-wide"
        />
      </motion.div>

      {/* 3. The Couple's Name (Center-Bottom) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        className="z-30 text-center mb-10 w-full max-w-4xl"
      >
        <h1 className="font-marathi text-6xl md:text-9xl text-wedding-maroon font-black mb-6 drop-shadow-sm leading-tight">
          <span className="block lg:inline-block">{COUPLE.groom.name}</span>
          <span className="block lg:inline-block text-4xl md:text-6xl text-mauli-gold font-serif mx-0 lg:mx-8 my-2 lg:my-0 opacity-80">
            &
          </span>
          <span className="block lg:inline-block">{COUPLE.bride.name}</span>
        </h1>

        <div className="flex items-center justify-center gap-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            className="h-[1.5px] bg-gradient-to-r from-transparent to-mauli-gold"
          />
          <p className="font-marathi text-sm md:text-xl text-gray-700 tracking-[0.4em] uppercase font-bold">
            The Royal Wedding
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            className="h-[1.5px] bg-gradient-to-l from-transparent to-mauli-gold"
          />
        </div>
      </motion.div>

      {/* 4. Animated Scroll Indicator (Bottom) */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-mauli-gold flex flex-col items-center gap-1 cursor-pointer"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">
          Explore
        </span>
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}