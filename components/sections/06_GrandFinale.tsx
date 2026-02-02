"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import EventCard from "../shared/EventCard";
import { SHLOKAS, TIMELINE } from "@/lib/constants";
import { MapPin, Sparkles, Clock, Compass } from "lucide-react";
import ThreadKnot from "../mauli/ThreadKnot";
import { useEffect, useState, useRef } from "react";

interface Particle {
  width: number;
  height: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function GrandFinale() {
  const data = TIMELINE[3];
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ySpring = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const generated = [...Array(15)].map((_, i) => ({
      width: Math.random() * 5 + 2,
      height: Math.random() * 5 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 6 + 4,
      delay: i * 0.5,
    }));
    setParticles(generated);
  }, []);

  return (
    <section ref={containerRef} className="relative py-12 md:py-24 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* 1. Ambient Golden Particle System */}
      <motion.div style={{ y: ySpring }} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-mauli-gold/20 rounded-full blur-[1px]"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: [0, -300],
              opacity: [0, 0.6, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* 2. Header & The Sacred Scroll */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-20 space-y-6" 
      >
        <div className="relative inline-block px-6 md:px-10">
           <div className="absolute top-1/2 left-0 w-6 md:w-8 h-px bg-mauli-gold/50" />
           <h2 className="text-3xl md:text-6xl font-marathi font-black text-wedding-maroon tracking-tight leading-tight">
            {data.date}
          </h2>
          <div className="absolute top-1/2 right-0 w-6 md:w-8 h-px bg-mauli-gold/50" />
        </div>

        <div className="relative py-8 md:py-12 px-4 md:px-8 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-mauli-gold/20 shadow-xl overflow-hidden group">
          <div className="absolute top-4 left-4 w-8 md:w-12 h-8 md:h-12 border-t-2 border-l-2 border-mauli-gold/30 rounded-tl-xl" />
          <div className="absolute bottom-4 right-4 w-8 md:w-12 h-8 md:h-12 border-b-2 border-r-2 border-mauli-gold/30 rounded-br-xl" />
          
          <ShlokaText
            text={SHLOKAS.muhurta}
            size="lg"
            className="text-wedding-royal font-black leading-snug mb-4 tracking-wide text-lg md:text-2xl"
          />
          <div className="flex items-center justify-center gap-2 md:gap-3 text-mauli-gold/80">
             <div className="h-px w-4 md:w-6 bg-mauli-gold/20" />
             <Clock size={12} className="animate-pulse md:w-4 md:h-4" />
             <p className="font-serif italic tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[9px] font-bold uppercase">
               The Divine Moment
             </p>
             <div className="h-px w-4 md:w-6 bg-mauli-gold/20" />
          </div>
        </div>
      </motion.div>

      {/* 3. Rituals Progression */}
      <div className="space-y-12 md:space-y-16 mb-16 md:mb-24">
        <EventCard
          time={data.events[0].time}
          title={data.events[0].title}
          dress_code={data.events[0].dress_code}
          isLeft={true}
          variant="royal"
        />

        {/* Enhanced Puja Highlight Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 z-20">
            <ThreadKnot className="scale-90 md:scale-110" />
          </div>
          
          <div className="bg-gradient-to-b from-orange-50/40 via-white to-white border border-orange-100/50 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 text-orange-700/60 mb-4 md:mb-5">
              <Clock size={14} />
              <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase leading-tight">सकाळी ११.०० ते १२.३० वाजेपर्यंत</span>
            </div>

            <ShlokaText
              text={SHLOKAS.puja}
              size="md"
              className="text-orange-800/50 mb-4 md:mb-6 italic font-medium text-base md:text-xl"
            />
            
            <h3 className="text-3xl md:text-5xl font-marathi font-black text-orange-950 mb-4 md:mb-6 tracking-tighter leading-tight">
               {data.events[1].title} 
            </h3>
            
            <div className="flex flex-col items-center gap-2 md:gap-3">
              <span className="text-[8px] md:text-[9px] text-orange-800/40 font-black uppercase tracking-[0.3em]">🎽 ड्रेस कोड</span>
              <div className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2.5 md:py-3 bg-orange-50 rounded-xl md:rounded-2xl text-orange-900 border border-orange-100">
                 <Sparkles size={14} className="text-orange-400 md:w-4 md:h-4" />
                 <p className="font-marathi text-base md:text-lg font-black leading-none">महिला : पैठणी साडी</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. The Grand Reception Finale */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-wedding-royal text-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 shadow-2xl relative overflow-hidden group border-b-[6px] md:border-b-[8px] border-mauli-gold"
      >
        <div className="absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-mauli-gold/10 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-white/5 rounded-full blur-[60px] md:blur-[80px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-center space-y-6 md:space-y-10">
          <div className="space-y-1">
            <ShlokaText text={SHLOKAS.reception.line1} size="sm" className="text-mauli-gold font-black tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm" />
            <ShlokaText text={SHLOKAS.reception.line2} size="sm" className="text-mauli-gold/80 font-black tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm" />
          </div>

          <div className="space-y-3 md:space-y-4">
            <h3 className="text-4xl md:text-8xl font-marathi font-black tracking-tight text-white leading-tight md:leading-none">
              {data.events[2].title}
            </h3>
            <div className="flex items-center justify-center gap-3 md:gap-4">
               <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-mauli-gold to-transparent" />
               <span className="text-mauli-gold font-black tracking-[0.3em] md:tracking-[0.5em] text-[7px] md:text-[8px] uppercase">The Royal Gala</span>
               <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent via-mauli-gold to-transparent" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 max-w-sm md:max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-mauli-gold/80 mb-2 md:mb-3">
               <MapPin size={16} />
               <span className="font-black uppercase tracking-[0.2em] text-[8px] md:text-[9px]">Venue Location</span>
            </div>
            <p className="text-xl md:text-3xl font-marathi font-black leading-tight text-white mb-1">
              {data.events[2].location}
            </p>
            <p className="text-[8px] md:text-[9px] text-mauli-gold/50 font-serif italic tracking-widest uppercase">Hinganghat, Maharashtra</p>
          </div>

          <motion.a
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            href={data.events[2].map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-3.5 md:py-4 bg-mauli-gold text-wedding-royal font-black rounded-full hover:bg-white transition-all shadow-xl text-[10px] md:text-xs"
          >
            <Compass size={18} className="group-hover:rotate-45 transition-transform md:w-5 md:h-5" />
            NAVIGATE TO VENUE
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}