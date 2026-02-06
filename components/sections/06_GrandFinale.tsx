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

  const parallaxCard = useSpring(useTransform(scrollYProgress, [0.3, 0.8], [20, -20]), {
    stiffness: 80,
    damping: 25
  });

  useEffect(() => {
    const generated = [...Array(12)].map((_, i) => ({
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 8 + 5,
      delay: i * 0.4,
    }));
    setParticles(generated);
  }, []);

  return (
    <section ref={containerRef} className="relative py-16 md:py-48 px-4 w-full max-w-6xl mx-auto overflow-hidden md:overflow-visible">
      
      {/* 1. Golden Dust System */}
      <motion.div style={{ y: ySpring }} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-mauli-gold/30 rounded-full blur-[1px]"
            style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
            animate={{
              y: [0, -400],
              opacity: [0, 0.7, 0],
              scale: [1, 1.5, 1],
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

      {/* 2. Sacred Scroll Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 md:mb-56 space-y-8 md:space-y-12 w-full" 
      >
        {/* Adjusted Date Container for Mobile Chrome */}
        <div className="flex items-center justify-center gap-4 w-full max-w-[100vw] px-2">
           <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }} className="h-px bg-mauli-gold/40 flex-1 hidden sm:block" />
           <h2 className="text-[8vw] sm:text-[10vw] md:text-9xl font-marathi font-black text-wedding-maroon tracking-tighter drop-shadow-sm whitespace-normal sm:whitespace-nowrap leading-tight">
            {data.date}
          </h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }} className="h-px bg-mauli-gold/40 flex-1 hidden sm:block" />
        </div>

        <div className="relative py-10 md:py-28 px-6 md:px-20 rounded-[2.5rem] md:rounded-[5rem] bg-white border border-mauli-gold/15 shadow-xl overflow-hidden max-w-5xl mx-auto group">
          <div className="absolute top-6 left-6 w-12 md:w-24 h-12 md:h-24 border-t-2 border-l-2 border-mauli-gold/30 rounded-tl-[1.5rem] md:rounded-tl-[2rem]" />
          <div className="absolute bottom-6 right-6 w-12 md:w-24 h-12 md:h-24 border-b-2 border-r-2 border-mauli-gold/30 rounded-br-[1.5rem] md:rounded-br-[2rem]" />
          
          <ShlokaText
            text={SHLOKAS.muhurta}
            size="lg"
            className="text-wedding-royal font-black leading-[1.6] mb-6 md:mb-10 tracking-wide text-lg md:text-[2.75rem] drop-shadow-sm px-2"
          />
          
          <div className="flex items-center justify-center gap-4 md:gap-6 text-mauli-gold/80">
             <div className="h-px w-6 md:w-20 bg-gradient-to-r from-transparent to-mauli-gold/40" />
             <Clock size={18} className="animate-spin-slow shrink-0" />
             <p className="font-serif italic tracking-[0.1em] md:tracking-[0.5em] text-[8px] md:text-sm font-black uppercase whitespace-nowrap">The Divine Moment</p>
             <div className="h-px w-6 md:w-20 bg-gradient-to-l from-transparent to-mauli-gold/40" />
          </div>
        </div>
      </motion.div>

      {/* 3. Rituals Progression */}
      <div className="flex flex-col items-center space-y-24 md:space-y-80 mb-32 md:mb-72 w-full overflow-visible">
        
        <div className="w-full flex justify-center px-4">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <EventCard
              time={data.events[0].time}
              title={data.events[0].title}
              dress_code={(data.events[0] as any).dress_code}
              isLeft={true}
              variant="royal"
            />
          </motion.div>
        </div>

        {/* Satyanarayan Puja Card */}
        <motion.div 
          style={{ y: parallaxCard }}
          className="relative w-full max-w-[800px] px-2 md:px-0 z-20"
        >
          <div className="absolute -top-10 md:-top-24 left-1/2 -translate-x-1/2 z-30">
            <ThreadKnot className="scale-90 md:scale-[1.8]" />
          </div>
          
          <div className="bg-gradient-to-b from-orange-50/90 via-white to-white border border-mauli-gold/30 rounded-[3rem] md:rounded-[6rem] pt-20 pb-12 md:pt-44 md:pb-32 px-4 md:px-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 text-orange-200/20 pointer-events-none flex items-center justify-center">
              <Sparkles className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]" />
            </motion.div>

            <div className="relative z-10 w-full flex flex-col items-center px-2">
              <div className="flex items-center justify-center gap-2 text-orange-700 mb-6 md:mb-10">
                <Clock size={18} className="opacity-80 animate-pulse" />
                <span className="text-[9px] md:text-base font-black tracking-[0.2em] md:tracking-[0.4em] uppercase">सकाळी ११.०० ते १२.३० वाजेपर्यंत</span>
              </div>

              <ShlokaText
                text={SHLOKAS.puja}
                size="md"
                className="text-mauli-red/90 mb-8 md:mb-12 italic font-black text-base md:text-[2.2rem] leading-relaxed text-center px-4"
              />
              
              <h3 className="text-[11vw] md:text-[8rem] font-marathi font-black text-wedding-maroon mb-8 md:mb-12 tracking-tight leading-[1.1] text-center w-full">
                 {data.events[1].title} 
              </h3>
              
              <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
                <div className="flex items-center gap-3 opacity-60">
                  <div className="h-px w-4 md:w-6 bg-mauli-gold" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-900">ड्रेस कोड</span>
                  <div className="h-px w-4 md:w-6 bg-mauli-gold" />
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white shadow-md border border-mauli-gold/20 rounded-2xl text-wedding-maroon"
                >
                   <Sparkles size={14} className="text-mauli-gold animate-pulse" />
                   <p className="font-marathi text-sm md:text-3xl font-black whitespace-nowrap">
                     महिला : पैठणी साडी
                   </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. The Grand Reception Finale */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-wedding-royal text-white rounded-[2.5rem] md:rounded-[7rem] p-6 md:p-36 shadow-2xl relative overflow-hidden group border-b-[10px] md:border-b-[24px] border-mauli-gold w-full mt-10 md:mt-20"
      >
        <div className="absolute top-0 right-0 w-[400px] md:w-[1000px] h-[400px] md:h-[1000px] bg-mauli-gold/15 rounded-full blur-[100px] md:blur-[250px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        
        <div className="relative z-10 text-center space-y-10 md:space-y-24">
          <div className="space-y-3 px-2">
            <ShlokaText text={SHLOKAS.reception.line1} size="sm" className="text-mauli-gold font-black tracking-[0.1em] md:tracking-[0.3em] text-[8px] md:text-2xl opacity-80" />
            <ShlokaText text={SHLOKAS.reception.line2} size="sm" className="text-mauli-gold font-black tracking-[0.1em] md:tracking-[0.3em] text-[8px] md:text-2xl" />
          </div>

          <div className="space-y-6">
            <h3 className="text-[12vw] md:text-[13rem] font-marathi font-black tracking-tighter text-white leading-none drop-shadow-2xl">
              {data.events[2].title}
            </h3>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl mx-auto"
            >
              <Clock size={16} className="text-mauli-gold animate-pulse shrink-0" />
              <div className="text-left">
                <p className="text-[7px] md:text-xs uppercase tracking-widest text-mauli-gold/80 font-black leading-none mb-1">सांयकाळी (Evening)</p>
                <p className="text-base md:text-3xl font-marathi font-black text-white leading-none">७.०० वाजल्यापासून</p>
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-3 md:gap-10">
               <div className="h-px flex-1 max-w-[60px] md:max-w-[150px] bg-gradient-to-r from-transparent via-mauli-gold to-transparent opacity-50" />
               <span className="text-mauli-gold font-black tracking-[0.4em] md:tracking-[0.8em] text-[7px] md:text-sm uppercase whitespace-nowrap">The Royal Gala</span>
               <div className="h-px flex-1 max-w-[60px] md:max-w-[150px] bg-gradient-to-l from-transparent via-mauli-gold to-transparent opacity-50" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl p-6 md:p-20 rounded-[2rem] md:rounded-[5rem] border border-white/10 w-full max-w-4xl mx-auto shadow-inner ring-1 ring-white/20">
            <div className="flex items-center justify-center gap-3 text-mauli-gold mb-6 md:mb-10">
               <MapPin size={20} className="md:w-12 md:h-12" />
               <span className="font-black uppercase tracking-[0.2em] md:tracking-[0.5em] text-[9px] md:text-xl">Reception Venue</span>
            </div>
            <p className="text-[7vw] md:text-[6.5rem] font-marathi font-black leading-tight text-white mb-4 md:mb-6 drop-shadow-md px-2">
              {(data.events[2] as any).location}
            </p>
            <p className="text-[8px] md:text-2xl text-mauli-gold/70 font-serif italic tracking-[0.2em] md:tracking-[0.4em] uppercase">Wardha District, Maharashtra</p>
          </div>

          <motion.a
            whileHover={{ scale: 1.05, y: -5, backgroundColor: "#fff" }}
            whileTap={{ scale: 0.95 }}
            href={(data.events[2] as any).map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 md:gap-10 px-8 md:px-28 py-5 md:py-12 bg-mauli-gold text-wedding-royal font-black rounded-full transition-all shadow-xl text-[10px] md:text-2xl tracking-[0.1em] md:tracking-[0.3em]"
          >
            <Compass size={18} className="group-hover:rotate-90 transition-transform md:w-12 md:h-12" />
            START NAVIGATION
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}