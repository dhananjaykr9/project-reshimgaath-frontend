"use client";

import { useState, useRef } from "react";
import Modal from "../ui/Modal";
import { DEVELOPER } from "@/lib/constants";
import { Linkedin, Instagram, Github, Code, Heart, Cpu, ExternalLink, Braces, Sparkles, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeveloperInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const magneticRef = useRef<HTMLDivElement>(null);

  // Magnetic Effect Logic for the trigger
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = magneticRef.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <>
      {/* 1. The Family Seal & Magnetic Footer */}
      <footer className="w-full py-24 text-center border-t border-mauli-gold/10 mt-20 relative bg-gradient-to-b from-transparent via-wedding-paper/30 to-wedding-paper/80">
        <div className="max-w-md mx-auto px-4 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="font-marathi text-3xl md:text-4xl text-wedding-maroon font-extrabold tracking-tight drop-shadow-sm">
              कृतज्ञतापूर्वक – गावस्कर परिवार
            </p>
            <div className="flex justify-center items-center gap-6 mt-6">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-mauli-gold to-transparent"></div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  filter: ["drop-shadow(0 0 0px #b91c1c)", "drop-shadow(0 0 8px #b91c1c)", "drop-shadow(0 0 0px #b91c1c)"]
                }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <Heart size={28} className="text-mauli-red fill-current" />
              </motion.div>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-mauli-gold to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            ref={magneticRef}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.1 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative inline-flex flex-col items-center justify-center py-8 px-14 rounded-[3rem] bg-white/40 backdrop-blur-xl border border-mauli-gold/20 shadow-2xl hover:bg-white/90 transition-all duration-500 ring-1 ring-white/50"
            >
              <span className="text-sm font-marathi text-gray-500 group-hover:text-wedding-royal transition-colors font-bold tracking-wide">
                {DEVELOPER.modal_title}
              </span>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[11px] text-mauli-gold font-black uppercase tracking-[0.3em]">
                  Meet the Engineer
                </span>
                <motion.div animate={{ rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <ExternalLink size={14} className="text-mauli-gold" />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </footer>

      {/* 2. Developer Insights Modal */}
      <AnimatePresence>
        {isOpen && (
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Engineering the Celebration">
            <div className="flex flex-col items-center text-center space-y-10 py-8 overflow-y-auto max-h-[85vh] custom-scrollbar px-4">
              
              {/* Profile Showcase */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ rotateY: 10, rotateX: -5 }}
                className="relative cursor-default"
              >
                <div className="absolute inset-[-18px] rounded-full border-[1.5px] border-mauli-gold/30 border-dashed animate-[spin_40s_linear_infinite]" />
                <div className="absolute inset-[-28px] rounded-full border-[1px] border-wedding-royal/10 border-dashed animate-[spin_60s_linear_infinite_reverse]" />
                
                <div className="w-40 h-40 md:w-44 md:h-44 rounded-full bg-white border-[8px] border-white shadow-2xl overflow-hidden relative z-10 ring-1 ring-mauli-gold/20">
                  <img 
                    src="/images/developer/me.jpg" 
                    alt={DEVELOPER.name} 
                    className="w-full h-full object-cover transition-all duration-700 grayscale-[10%] hover:grayscale-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${DEVELOPER.name}&background=7c2d12&color=fff&size=256&bold=true`; }}
                  />
                </div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -bottom-2 -right-1 bg-wedding-royal p-3 rounded-2xl text-white shadow-xl z-20 border-4 border-white">
                  <Cpu size={20} className="text-mauli-gold fill-current" />
                </motion.div>
              </motion.div>

              {/* Personal Branding */}
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-wedding-maroon tracking-tight">
                  {DEVELOPER.name}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="px-4 py-1.5 bg-mauli-gold/10 text-mauli-gold rounded-full text-[9px] font-black uppercase tracking-widest border border-mauli-gold/10">
                    {DEVELOPER.relation}
                  </span>
                  <span className="px-4 py-1.5 bg-wedding-royal/5 text-wedding-royal rounded-full text-[9px] font-black uppercase tracking-widest border border-wedding-royal/10">
                    Chief Tech & Family Engineer
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative px-6 max-w-sm">
                <Quote className="absolute -top-6 -left-2 text-mauli-gold/10 rotate-180" size={40} />
                <p className="text-gray-600 font-marathi text-xl italic leading-relaxed relative z-10">
                  {DEVELOPER.modal_text}
                </p>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-4 w-full pt-8 border-t border-gray-100">
                {[
                  { icon: Linkedin, color: '#0077b5', link: DEVELOPER.links.linkedin, label: 'LinkedIn' },
                  { icon: Instagram, color: '#E1306C', link: DEVELOPER.links.instagram, label: 'Instagram' },
                  { icon: Github, color: '#181717', link: DEVELOPER.links.github, label: 'GitHub' }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-2 p-4 bg-slate-50/50 rounded-3xl border border-transparent hover:border-mauli-gold/10 hover:bg-white transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-white shadow-sm" style={{ color: social.color }}>
                      <social.icon size={22} />
                    </div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{social.label}</span>
                  </motion.a>
                ))}
              </div>
              
              {/* Footer Details */}
              <div className="pt-6 flex flex-col items-center gap-4 w-full opacity-50">
                <div className="flex items-center gap-3 text-gray-400">
                  <Braces size={14} className="text-wedding-royal" />
                  <span className="text-[8px] uppercase font-black tracking-[0.3em]">
                    Next.js 15 • Framer Motion
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[8px] text-gray-400 font-black uppercase tracking-widest">
                   <Code size={10} /> Handcrafted for Atul & Vaishnavi
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}