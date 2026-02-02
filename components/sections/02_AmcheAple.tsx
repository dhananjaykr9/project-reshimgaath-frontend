"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import { SHLOKAS, COUPLE } from "@/lib/constants";
import ThreadKnot from "../mauli/ThreadKnot";
import Modal from "../ui/Modal";
import { GraduationCap, Briefcase, Quote, Heart, Sparkles, User, Camera } from "lucide-react";

export default function AmcheAple() {
  const [activeProfile, setActiveProfile] = useState<"groom" | "bride" | null>(null);

  const selectedPerson = activeProfile ? COUPLE[activeProfile] : null;

  const renderProfileContent = (person: typeof COUPLE.groom) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 py-2 max-w-lg mx-auto"
    >
      {/* 1. Profile Hero with Divine Ring */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-15px] rounded-full border-2 border-dashed border-mauli-gold/40 opacity-60" 
        />
        <div className="w-full h-full rounded-full border-[6px] border-white shadow-2xl overflow-hidden relative z-10 ring-2 ring-mauli-gold/10">
          <img 
            src={`/images/profiles/${activeProfile}_profile.jpg`} 
            alt={person.name}
            className="w-full h-full object-cover" 
          />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -bottom-1 right-2 bg-gradient-to-tr from-wedding-maroon to-mauli-red p-3 rounded-full text-white shadow-xl z-20 border-2 border-white"
        >
          <Heart size={18} fill="currentColor" />
        </motion.div>
      </div>

      {/* 2. Professional & Identity Grid */}
      <div className="grid gap-4 mt-8">
        {[
          { icon: GraduationCap, label: "शिक्षण (Education)", val: person.education, color: "text-blue-600" },
          { icon: Briefcase, label: "व्यवसाय (Profession)", val: person.work, color: "text-emerald-600" }
        ].map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            key={idx}
            className="group flex items-start gap-5 p-5 bg-gradient-to-r from-white to-wedding-paper/20 rounded-3xl border border-mauli-gold/10 hover:border-mauli-gold/30 hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform">
              <item.icon className="text-wedding-maroon" size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-mauli-gold tracking-widest">{item.label}</p>
              <p className="font-marathi text-lg leading-tight text-gray-800 font-bold">{item.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. The Personal Trait Statement */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative bg-wedding-maroon/5 p-8 rounded-[2.5rem] border-x-4 border-wedding-maroon/20"
      >
        <Quote className="absolute -top-3 left-8 text-wedding-maroon/20 rotate-12" size={40} />
        <p className="font-marathi text-2xl text-wedding-maroon font-black italic leading-relaxed text-center">
          {person.trait}
        </p>
      </motion.div>

      {/* 4. Journey Gallery Title */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-mauli-gold/30" />
          <h3 className="font-marathi text-2xl text-wedding-maroon font-black flex items-center gap-2">
            <Camera size={20} className="text-mauli-gold" />
            {person.journey_title}
          </h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-mauli-gold/30" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-sm border-2 border-white relative group"
            >
               <div className="absolute inset-0 bg-wedding-maroon/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <img 
                src={`/images/profiles/${activeProfile}/${i}.jpg`} 
                alt="Memorable Moment" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400?text=Memories")}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden bg-wedding-paper/20">
      {/* Section Background Art */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/textures/mandala.png')] bg-center bg-no-repeat bg-contain scale-110" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <ThreadKnot className="mb-8 scale-125" />
          <h2 className="font-marathi text-6xl md:text-8xl text-wedding-maroon font-black tracking-tight mb-6">
            आमचे आपले
          </h2>
          <div className="flex justify-center items-center gap-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-mauli-gold to-transparent" />
            <Sparkles className="text-mauli-gold" size={24} />
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-mauli-gold to-transparent" />
          </div>
        </motion.div>

        {/* Profile Card Selection */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32">
          {["groom", "bride"].map((type) => {
            const person = COUPLE[type as keyof typeof COUPLE];
            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15 }}
                onClick={() => setActiveProfile(type as any)}
                className="relative cursor-pointer group text-center"
              >
                {/* Divine Spotlight Effect */}
                <div className="absolute inset-0 bg-mauli-gold/10 blur-[80px] rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="relative">
                  <div className="w-60 h-60 md:w-80 md:h-80 rounded-full border-[12px] border-white shadow-2xl overflow-hidden transition-all duration-700 group-hover:border-mauli-gold/40 ring-1 ring-black/5">
                    <img
                      src={`/images/profiles/${type}_profile.jpg`}
                      alt={person.name}
                      className="w-full h-full object-cover transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Floating Bio Label */}
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-b from-white to-wedding-paper px-8 py-3 rounded-full shadow-xl border border-mauli-gold/20 z-20 min-w-[140px]"
                  >
                    <p className="text-[11px] font-black uppercase text-mauli-gold tracking-[0.4em] mb-0.5">
                      {person.bio_header}
                    </p>
                    <div className="flex justify-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-mauli-gold" />
                        <div className="w-8 h-px bg-mauli-gold/30 mt-0.5" />
                        <div className="w-1 h-1 rounded-full bg-mauli-gold" />
                    </div>
                  </motion.div>
                </div>

                <div className="mt-16 space-y-4">
                  <h3 className="font-marathi text-6xl text-wedding-maroon group-hover:text-mauli-red transition-all duration-300 font-black tracking-tight">
                    {person.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-mauli-gold uppercase tracking-widest">View Profile</span>
                      <User size={12} className="text-mauli-gold" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal for Detailed Profile */}
      <AnimatePresence>
        {activeProfile && (
          <Modal
            isOpen={!!activeProfile}
            onClose={() => setActiveProfile(null)}
            title={selectedPerson?.name || ""}
          >
            {selectedPerson && renderProfileContent(selectedPerson)}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}