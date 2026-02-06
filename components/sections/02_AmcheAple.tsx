"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import { SHLOKAS, COUPLE } from "@/lib/constants";
import ThreadKnot from "../mauli/ThreadKnot";
import Modal from "../ui/Modal";
import { GraduationCap, Briefcase, Quote, Heart, Sparkles, Camera, ArrowRightCircle, Clock, PartyPopper, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for the particle effect
interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function AmcheAple() {
  const [activeProfile, setActiveProfile] = useState<"groom" | "bride" | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isCeremonyStarted, setIsCeremonyStarted] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const nextId = useRef(0);

  // 1. Unified Countdown Logic for Feb 25, 11:45 AM
  useEffect(() => {
    const targetDate = new Date("2026-02-25T11:45:00");
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        setIsCeremonyStarted(true);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const selectedPerson = activeProfile ? COUPLE[activeProfile] : null;

  // 2. Heart Trail Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Math.random() > 0.15) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticle = { id: nextId.current++, x, y };
    setParticles((prev) => [...prev.slice(-15), newParticle]);
  };

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [particles]);

  // Restored: Content inside the Modal
  const renderProfileContent = (person: typeof COUPLE.groom) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 py-6 max-w-lg mx-auto"
    >
      {/* A. Profile Hero */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-[-12px] rounded-full bg-mauli-gold/10 blur-xl"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-18px] rounded-full border border-dashed border-mauli-gold/40 opacity-50" 
        />
        <div className="w-full h-full rounded-full border-[10px] border-white shadow-2xl overflow-hidden relative z-10 ring-1 ring-mauli-gold/20">
          <img 
            src={`/images/profiles/${activeProfile}_profile.jpg`} 
            alt={person.name}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
          />
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute -bottom-1 right-5 bg-gradient-to-tr from-wedding-maroon to-mauli-red p-4 rounded-2xl text-white shadow-2xl z-20 border-4 border-white"
        >
          <Heart size={22} fill="currentColor" className="animate-pulse" />
        </motion.div>
      </div>

      {/* B. Education & Profession */}
      <div className="grid gap-6">
        {[
          { icon: GraduationCap, label: "शिक्षण • Education", val: person.education, bg: "bg-blue-50/50" },
          { icon: Briefcase, label: "व्यवसाय • Profession", val: person.work, bg: "bg-emerald-50/50" }
        ].map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            key={idx}
            className={cn(
              "group flex items-center gap-6 p-6 rounded-[2.5rem] border border-mauli-gold/10 hover:border-mauli-gold/40 hover:bg-white hover:shadow-xl transition-all duration-500",
              item.bg
            )}
          >
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-mauli-gold/5 group-hover:scale-110 group-hover:bg-wedding-maroon group-hover:text-white transition-all duration-300">
              <item.icon size={28} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-mauli-gold uppercase tracking-[0.25em]">{item.label}</p>
              <p className="font-marathi text-xl text-slate-800 font-black leading-tight">{item.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* C. Statement */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative bg-white p-10 rounded-[3.5rem] shadow-lg border border-mauli-gold/5 italic overflow-hidden"
      >
        <Quote className="absolute -top-2 left-6 text-mauli-gold/15 rotate-12" size={64} />
        <p className="font-marathi text-2xl md:text-3xl text-wedding-maroon font-black leading-relaxed text-center relative z-10">
          "{person.trait}"
        </p>
        <div className="absolute bottom-[-20px] right-[-20px] opacity-10 rotate-12">
            <Sparkles size={100} className="text-mauli-gold" />
        </div>
      </motion.div>

      {/* D. JOURNEY GALLERY (Zoom Enabled) */}
      <div className="space-y-8 pt-4">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mauli-gold/40 to-transparent" />
          <h3 className="font-marathi text-3xl text-wedding-maroon font-black flex items-center gap-3">
            <Camera size={24} className="text-mauli-gold" />
            क्षणचित्रे
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-mauli-gold/40 to-transparent" />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => {
            const imgSrc = `/images/profiles/${activeProfile}/${i}.jpg`;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, rotate: i % 2 === 0 ? 3 : -3 }}
                onClick={() => setZoomedImage(imgSrc)}
                className="aspect-[4/5] bg-white p-2 pb-10 rounded-xl shadow-xl border border-mauli-gold/5 relative group cursor-zoom-in"
              >
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img 
                    src={imgSrc} 
                    alt="Memory" 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => (e.currentTarget.src = "https://ui-avatars.com/api/?name=Moment&background=fdfcf0&color=d4af37&bold=true")}
                  />
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                   <div className="w-8 h-1 bg-mauli-gold/20 mx-auto rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen py-16 md:py-24 px-4 overflow-hidden bg-wedding-paper/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-[url('/images/textures/mandala.png')] bg-no-repeat bg-center bg-contain" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* COUNTDOWN BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-16 md:mb-20 px-2"
        >
          <AnimatePresence mode="wait">
            {!isCeremonyStarted ? (
              <motion.div 
                key="countdown"
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/40 backdrop-blur-xl border border-mauli-gold/20 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl flex flex-wrap items-center justify-center gap-4 md:gap-12"
              >
                <div className="flex flex-col items-center text-mauli-gold shrink-0">
                   <Clock className="w-5 h-5 md:w-6 md:h-6 animate-spin-slow mb-1" />
                   <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">Countdown</span>
                </div>

                <div className="flex gap-4 md:gap-12 items-center">
                  {[
                    { label: "दिवस", val: timeLeft.days },
                    { label: "तास", val: timeLeft.hours },
                    { label: "मिनिटे", val: timeLeft.mins },
                    { label: "सेकंद", val: timeLeft.secs }
                  ].map((unit, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[50px] md:min-w-[60px]">
                      <motion.span 
                        key={unit.val}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-6xl font-black text-wedding-maroon font-serif leading-none"
                      >
                        {String(unit.val).padStart(2, '0')}
                      </motion.span>
                      <span className="text-[9px] md:text-xs font-black text-mauli-gold uppercase tracking-[0.1em] md:tracking-[0.2em] font-marathi mt-1 md:mt-2">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-12 w-px bg-mauli-gold/20 hidden lg:block" />
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                    शुभ विवाहासाठी<br />उरलेला वेळ
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="banner"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative group w-full"
              >
                <div className="absolute inset-0 bg-wedding-maroon/20 rounded-[2.5rem] md:rounded-[3rem] blur-3xl animate-pulse" />
                <div className="bg-gradient-to-br from-wedding-maroon via-mauli-red to-wedding-maroon border-2 border-mauli-gold/40 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl relative z-10 text-center overflow-hidden">
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -left-10 text-mauli-gold/20">
                      <Sparkles size={100} />
                   </motion.div>
                   <div className="flex flex-col items-center gap-3 md:gap-4">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="bg-mauli-gold/10 p-3 md:p-4 rounded-full border border-mauli-gold/20">
                         <PartyPopper className="text-mauli-gold w-8 h-8 md:w-10 md:h-10" />
                      </motion.div>
                      <h2 className="font-marathi text-[8vw] md:text-7xl text-white font-black tracking-tight drop-shadow-lg leading-tight">
                         शुभ सोहळा सुरू झाला आहे!
                      </h2>
                      <div className="h-px w-24 md:w-32 bg-mauli-gold/40 my-1 md:my-2" />
                      <p className="font-marathi text-mauli-gold text-lg md:text-3xl italic font-bold">
                         "मंगलाष्टकांचा मंगल सूर, आनंदाचा हा सुंदर प्रहर..."
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* MAIN TITLE */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-28"
        >
          <ThreadKnot className="mb-8 md:mb-10 scale-100 md:scale-125" />
          <h2 className="font-marathi text-[12vw] md:text-9xl text-wedding-maroon font-black tracking-tighter mb-6 md:mb-8 drop-shadow-sm whitespace-nowrap">
            आमचे आपले
          </h2>
          <div className="flex justify-center items-center gap-6 md:gap-10 opacity-60">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-mauli-gold to-transparent" />
            <Sparkles className="text-mauli-gold animate-pulse w-6 h-6 md:w-8 md:h-8" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-mauli-gold to-transparent" />
          </div>
        </motion.div>

        {/* PROFILE CARDS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-32 md:gap-24 lg:gap-48 px-2">
          {["groom", "bride"].map((type) => {
            const person = COUPLE[type as keyof typeof COUPLE];
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -25, rotateY: type === 'groom' ? 8 : -8 }}
                onMouseMove={handleMouseMove}
                onClick={() => setActiveProfile(type as any)}
                className="relative cursor-pointer group w-full max-w-[320px] md:max-w-none"
                style={{ perspective: 1200 }}
              >
                <div className="absolute inset-0 pointer-events-none z-30">
                  <AnimatePresence>
                    {particles.map((particle) => (
                      <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: 0.5, x: particle.x, y: particle.y }}
                        animate={{ opacity: 0, scale: 1.5, y: particle.y - 100 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute text-mauli-red/60"
                      >
                        <Heart size={20} fill="currentColor" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="absolute inset-0 bg-mauli-gold/10 blur-[100px] rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-[-16px] md:inset-[-24px] rounded-full border-[1.5px] border-mauli-gold/30 border-dashed group-hover:border-mauli-gold/60" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute inset-[-28px] md:inset-[-36px] rounded-full border-[1px] border-wedding-royal/10 border-dashed" />

                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[8px] md:border-[12px] border-white shadow-2xl overflow-hidden relative z-10 transition-all duration-700 group-hover:border-mauli-gold/30">
                      <img src={`/images/profiles/${type}_profile.jpg`} alt={person.name} className="w-full h-full object-cover transition-all duration-1000 grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110" />
                    </div>
                    
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl px-8 md:px-12 py-4 md:py-5 rounded-[2.5rem] shadow-2xl border border-mauli-gold/20 z-20 min-w-[150px] md:min-w-[180px]">
                      <p className="text-[10px] md:text-[12px] font-black uppercase text-mauli-gold tracking-[0.3em] md:tracking-[0.4em] text-center mb-1">{person.bio_header}</p>
                      <div className="w-10 h-0.5 bg-mauli-gold/20 mx-auto rounded-full" />
                    </motion.div>
                  </div>

                  <div className="mt-20 md:mt-24 text-center space-y-4 md:space-y-6">
                    <h3 className="font-marathi text-[9vw] md:text-8xl text-wedding-maroon group-hover:text-mauli-red font-black tracking-tight leading-tight">{person.name}</h3>
                    <motion.div className="flex items-center justify-center gap-2 md:gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
                        <span className="text-[9px] md:text-[11px] font-black text-mauli-gold uppercase tracking-[0.2em] md:tracking-[0.3em]">परिचय पहा</span>
                        <ArrowRightCircle className="w-4 h-4 md:w-[18px] md:h-[18px] text-mauli-gold animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProfile && (
          <Modal isOpen={!!activeProfile} onClose={() => setActiveProfile(null)} title={selectedPerson?.name || ""}>
            {selectedPerson && renderProfileContent(selectedPerson)}
          </Modal>
        )}
      </AnimatePresence>

      {/* PHOTO ZOOM OVERLAY */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={zoomedImage}
              alt="Zoomed Memory"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border-4 border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}