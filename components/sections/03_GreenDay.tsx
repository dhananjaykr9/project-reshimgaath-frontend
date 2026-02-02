"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import EventCard from "../shared/EventCard";
import { SHLOKAS, TIMELINE } from "@/lib/constants";
import ThreadKnot from "../mauli/ThreadKnot";
import { Leaf, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function GreenDay() {
  const data = TIMELINE[0];
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smoother Parallax using useSpring
  const leafTopRaw = useTransform(scrollYProgress, [0, 1], [-100, 150]);
  const leafBottomRaw = useTransform(scrollYProgress, [0, 1], [100, -150]);
  
  const yLeafTop = useSpring(leafTopRaw, { stiffness: 50, damping: 20 });
  const yLeafBottom = useSpring(leafBottomRaw, { stiffness: 50, damping: 20 });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-transparent via-green-50/30 to-transparent"
    >
      {/* 1. Background Pattern & Foliage */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/textures/mehendi-pattern.png')] bg-[size:350px]" />
      
      <motion.div 
        style={{ y: yLeafTop }}
        className="absolute top-0 -left-24 opacity-[0.07] pointer-events-none"
      >
        <Leaf size={450} className="text-wedding-green rotate-[35deg] fill-current" />
      </motion.div>
      
      <motion.div 
        style={{ y: yLeafBottom }}
        className="absolute bottom-0 -right-24 opacity-[0.07] pointer-events-none"
      >
        <Leaf size={500} className="text-wedding-green -rotate-[35deg] fill-current" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 2. Header Section - Tightened spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-wedding-green/20 bg-white/70 backdrop-blur-md text-wedding-green font-black tracking-[0.2em] text-[10px] uppercase shadow-sm">
            <Sparkles size={12} className="animate-pulse" />
            {data.date}
            <Sparkles size={12} className="animate-pulse" />
          </div>
          
          <ShlokaText 
            text={SHLOKAS.mehendi} 
            size="sm" 
            className="text-wedding-green/70 font-semibold italic max-w-xl mx-auto leading-relaxed" 
          />
          
          <div className="flex items-center justify-center gap-6 py-2">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-wedding-green/30" />
            <ThreadKnot className="scale-125" />
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-wedding-green/30" />
          </div>

          <h2 className="font-marathi text-5xl md:text-7xl text-wedding-green font-black tracking-tighter leading-tight">
            मेहेंदी व संगीत सोहळा
          </h2>
        </motion.div>

        {/* 3. The Vertical Event Vine */}
        <div className="relative px-2">
          {/* Vertical Connecting Stem - More subtle */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-wedding-green/30 via-wedding-green/5 to-transparent hidden md:block -translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-28 relative">
            {data.events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <EventCard 
                  time={event.time}
                  title={event.title}
                  dress_code={event.dress_code}
                  note={event.note}
                  isLeft={index % 2 === 0}
                  variant="green" 
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Section Transition Outro */}
        <div className="mt-28 flex flex-col items-center gap-4">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: 80 }}
            transition={{ duration: 1 }}
            className="w-[1px] bg-gradient-to-b from-wedding-green/40 to-transparent" 
          />
          <Leaf size={18} className="text-wedding-green/20 rotate-180" />
        </div>
      </div>
    </section>
  );
}