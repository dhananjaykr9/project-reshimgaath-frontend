"use client";

import { motion } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import EventCard from "../shared/EventCard";
import { SHLOKAS, TIMELINE } from "@/lib/constants";
import ThreadKnot from "../mauli/ThreadKnot";
import { Sun } from "lucide-react";
import { useRef } from "react";

export default function YellowDay() {
  const data = TIMELINE[1];
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-transparent via-orange-50/20 to-transparent"
    >
      {/* 1. Sunlight & Festive Background Accents */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-wedding-haldi/10 via-wedding-haldi/5 to-transparent pointer-events-none" />
      
      {/* Refined Floating Particles (Marigold Petals) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 600],
            x: [0, (i % 2 === 0 ? 40 : -40)],
            rotate: [0, 360],
            opacity: [0, 0.25, 0]
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5
          }}
          className="absolute w-3 h-3 rounded-full bg-wedding-haldi/30 blur-[1px] pointer-events-none"
          style={{ 
            left: `${10 + (i * 12)}%`, 
            top: "-10%" 
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 2. Header & Spiritual Invocation - Balanced Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-wedding-haldi/20 bg-white/60 backdrop-blur-md text-orange-800 font-black text-[9px] uppercase tracking-[0.3em] shadow-sm mb-6">
            <Sun size={10} className="text-wedding-haldi animate-spin-slow" />
            {data.date}
            <Sun size={10} className="text-wedding-haldi animate-spin-slow" />
          </div>
          
          <ShlokaText 
            text={SHLOKAS.haldi} 
            size="sm"
            className="text-orange-700/80 font-medium italic max-w-lg mx-auto leading-relaxed tracking-wide mb-6" 
          />
          
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-wedding-haldi/15 rounded-full blur-2xl animate-pulse" />
            <ThreadKnot className="scale-110 relative z-10" />
          </div>

          <h2 className="font-marathi text-5xl md:text-7xl text-orange-900 font-black tracking-tight leading-[1.15] drop-shadow-sm max-w-3xl">
            हळदीचा थाट व संगीत
          </h2>
        </motion.div>

        {/* 3. Timeline Events - Enhanced Spacing & Alignment */}
        <div className="relative pt-8">
          {/* Vertical Golden Path - More subtle */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-wedding-haldi/40 via-orange-200/20 to-transparent hidden md:block -translate-x-1/2" />

          <div className="flex flex-col gap-10 md:gap-20 relative">
            {data.events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.21, 1.02, 0.47, 0.98], delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <EventCard 
                  time={event.time}
                  title={event.title}
                  dress_code={event.dress_code}
                  note={event.note}
                  isLeft={index % 2 !== 0}
                  variant="yellow"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Elegant Section Outro */}
      <div className="mt-24 flex flex-col items-center">
        <div className="flex gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.8 }}
              className="w-1.5 h-1.5 rounded-full bg-wedding-haldi" 
            />
          ))}
        </div>
        <div className="h-20 w-px bg-gradient-to-b from-wedding-haldi/30 to-transparent" />
      </div>
    </section>
  );
}