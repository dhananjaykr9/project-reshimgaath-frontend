"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import { SHLOKAS, TIMELINE } from "@/lib/constants";
import { Bus, MapPin, Navigation, Map, Radio, ExternalLink, LocateFixed } from "lucide-react";
import { useStore } from "@/lib/store";
import { useRef } from "react";

export default function TheJourney() {
  const data = TIMELINE[2]; // Day 3 Data: Travel
  const { isSadhaMode } = useStore();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const trackOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const roadX = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-transparent via-slate-100/30 to-transparent"
    >
      {/* 1. Section Branding */}
      <div className="w-full max-w-4xl mx-auto mb-12 relative">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="pl-6 border-l-[4px] border-mauli-gold"
        >
          <ShlokaText 
            text={SHLOKAS.journey} 
            size="sm" 
            className="text-gray-500 text-left italic mb-2" 
          />
          <h2 className="text-4xl md:text-5xl font-marathi font-black text-wedding-maroon tracking-tighter">
            {data.date}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <Map size={14} className="text-mauli-gold" />
            <p className="text-mauli-gold font-black uppercase tracking-[0.2em] text-[9px]">
              The Wedding Procession • वरात प्रस्थान
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. Interactive Road Track - Fixed for Mobile Compression */}
      <motion.div 
        style={{ opacity: trackOpacity }}
        className="relative w-full max-w-5xl mx-auto h-40 flex items-center px-4 md:px-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3rem] border border-white/50 shadow-2xl shadow-slate-200/50 overflow-hidden mb-12"
      >
        {/* Animated Road Lines */}
        <div className="absolute inset-x-8 md:inset-x-16 h-3 bg-slate-100 rounded-full shadow-inner overflow-hidden top-1/2 -translate-y-1/2">
          {!isSadhaMode && (
            <motion.div 
              style={{ x: roadX }}
              className="w-[300%] md:w-[200%] h-full flex gap-12 px-6"
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="w-12 h-full bg-slate-300 skew-x-[-30deg] flex-shrink-0" />
              ))}
            </motion.div>
          )}
        </div>

        {/* Departure Point - Adjusted position for small screens */}
        <div className="absolute left-4 md:left-8 flex flex-col items-center opacity-30">
           <div className="w-2 h-2 rounded-full bg-slate-500" />
           <span className="text-[7px] font-black text-slate-600 mt-2 uppercase tracking-widest">Kajalsara</span>
        </div>

        {/* The Bus - Floating Animation */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="absolute left-[15%] md:left-[20%] z-20"
        >
          <motion.div
            animate={isSadhaMode ? {} : { 
              y: [0, -3, 0],
              rotate: [0, 0.5, -0.5, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
            className="bg-white p-2.5 md:p-3.5 rounded-xl md:rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 md:gap-4 group"
          >
            <div className="p-2 md:p-2.5 bg-wedding-maroon rounded-lg md:rounded-xl text-white shadow-lg shadow-wedding-maroon/20">
              <Bus size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="pr-1 md:pr-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-green-500"></span>
                </span>
                <p className="text-[7px] md:text-[8px] uppercase font-black text-slate-400 tracking-tighter">Hinganghat</p>
              </div>
              <p className="text-xs md:text-sm font-black text-wedding-maroon font-marathi whitespace-nowrap">प्रवासाला सुरुवात...</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Destination Marker */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute right-4 md:right-[12%] flex flex-col items-center"
        >
          <div className="relative group">
            <MapPin size={32} className="md:w-11 md:h-11 text-mauli-red fill-mauli-red/10 drop-shadow-xl" />
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-mauli-red/20 rounded-full -z-10 blur-xl"
            />
          </div>
          <span className="font-marathi font-black text-lg md:text-xl text-slate-800 mt-1 tracking-tight">
            चंद्रपूर
          </span>
        </motion.div>
      </motion.div>

      {/* 3. लग्नस्थळ (Wedding Venue) - Responsive Container */}
      <div className="w-full max-w-xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative px-2"
        >
          <div className="bg-white/90 backdrop-blur-3xl p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl border border-white relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wedding-maroon/5 text-wedding-maroon mb-6">
              <LocateFixed size={14} className="animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">Arrival Venue</span>
            </div>

            <h3 className="text-3xl md:text-5xl font-marathi font-black text-wedding-maroon mb-4 tracking-tight">
              लग्नस्थळ
            </h3>

            <p className="text-slate-600 font-marathi text-lg md:text-2xl leading-relaxed italic mb-8 max-w-[95%] mx-auto">
              "{data.events[0].desc}"
            </p>

            <div className="flex flex-col items-center gap-6">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://maps.app.goo.gl/1S25fXf8tTf3gR6Y8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-4 bg-wedding-maroon text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-xs shadow-2xl hover:bg-mauli-red transition-all duration-300"
              >
                <Navigation size={18} />
                GOOGLE MAPS वर पहा
                <ExternalLink size={14} className="opacity-50" />
              </motion.a>

              <div className="flex items-center gap-3 md:gap-4 text-slate-300">
                <div className="h-px w-4 md:w-6 bg-slate-200" />
                <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.2em] text-slate-400 whitespace-nowrap">शकुंतला मॅरेज हॉल, चंद्रपूर</p>
                <div className="h-px w-4 md:w-6 bg-slate-200" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}