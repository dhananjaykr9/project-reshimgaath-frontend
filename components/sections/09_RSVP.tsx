"use client";

import { useState } from "react";
import { Send, Heart, User, MessageCircle, Sparkles, Feather } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShlokaText from "../shared/ShlokaText";
import { SHLOKAS } from "@/lib/constants";

export default function RSVP() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || !name.trim()) return;
    setIsSubmitting(true);
    // Simulate API Latency
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSent(true);
  };

  return (
    <section className="relative py-24 px-4 max-w-2xl mx-auto mb-20 overflow-hidden">
      {/* 1. Ambient Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.png')] mix-blend-multiply opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-mauli-gold/10 via-transparent to-transparent" />
      </div>

      {/* 2. Header Section - Refined Typography */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <Sparkles className="text-mauli-gold/60" size={32} />
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-marathi font-black text-wedding-maroon tracking-tight mb-4 leading-tight">
          शुभेच्छा व आशीर्वाद
        </h2>
        <div className="flex items-center justify-center gap-4 opacity-40">
          <div className="h-px w-12 bg-mauli-gold" />
          <Feather size={14} className="text-mauli-gold" />
          <div className="h-px w-12 bg-mauli-gold" />
        </div>
        <p className="text-slate-500 mt-6 font-marathi text-xl md:text-2xl leading-relaxed italic max-w-md mx-auto">
          "तुमचे प्रेम आणि सदिच्छा हीच आमच्यासाठी खरी भेट आहे."
        </p>
      </motion.div>

      {/* 3. The Interactive Form Card */}
      <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-mauli-gold/5 border border-mauli-gold/10 relative overflow-hidden ring-1 ring-white">
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-[10px] font-black text-mauli-gold uppercase tracking-[0.3em] pl-1">
                  <User size={12} /> आपले पूर्ण नाव
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. श्री. राजेश पाटील"
                  className="w-full p-5 bg-white/50 border border-mauli-gold/10 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-mauli-gold/20 focus:bg-white transition-all font-marathi text-xl shadow-sm placeholder:opacity-20 text-slate-800"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 text-[10px] font-black text-mauli-gold uppercase tracking-[0.3em] pl-1">
                  <MessageCircle size={12} /> आपला संदेश
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="तुमचा प्रेमळ आशीर्वाद येथे लिहा..."
                  className="w-full h-44 p-5 bg-white/50 border border-mauli-gold/10 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-mauli-gold/20 focus:bg-white transition-all font-marathi text-xl resize-none shadow-sm placeholder:opacity-20 leading-relaxed text-slate-800"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSend}
                disabled={!message.trim() || !name.trim() || isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-wedding-maroon to-mauli-red text-white font-black rounded-2xl shadow-xl shadow-mauli-red/20 flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale transition-all duration-300"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Sparkles size={24} />
                  </motion.div>
                ) : (
                  <>
                    <Send size={18} />
                    <span className="tracking-widest uppercase text-xs">आशीर्वाद पाठवा</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            /* 4. Success State */
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-wedding-green/20 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-xl relative z-10"
                >
                  <Heart size={40} className="text-wedding-green fill-wedding-green" />
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-4xl font-marathi font-black text-green-700 leading-tight">आम्ही कृतज्ञ आहोत!</h3>
                <p className="text-slate-500 font-marathi text-xl md:text-2xl leading-relaxed px-4">
                  <span className="text-wedding-maroon font-black">{name}</span> जी, तुमची ही सुंदर भेट आम्हाला मिळाली आहे. तुमच्या शुभेच्छा आमच्या प्रवासात प्रकाश देतील.
                </p>
              </div>
              
              <button 
                onClick={() => { setIsSent(false); setMessage(""); setName(""); }}
                className="mt-4 px-10 py-3 text-[10px] font-black uppercase tracking-widest text-wedding-maroon bg-wedding-maroon/5 rounded-full hover:bg-wedding-maroon/10 transition-all border border-wedding-maroon/10"
              >
                आणखी एक संदेश लिहा
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Footer Signature */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-28 text-center space-y-6"
      >
        <div className="flex items-center justify-center gap-4 opacity-30">
           <div className="h-px w-16 bg-gradient-to-r from-transparent to-mauli-gold" />
           <Sparkles size={16} className="text-mauli-gold" />
           <div className="h-px w-16 bg-gradient-to-l from-transparent to-mauli-gold" />
        </div>
        <ShlokaText text={SHLOKAS.footer} size="md" className="text-slate-400 font-bold tracking-[0.3em] uppercase leading-relaxed" />
      </motion.div>
    </section>
  );
}