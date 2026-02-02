"use client";

import { motion } from "framer-motion";
import ThreadKnot from "../mauli/ThreadKnot";
import { Heart, Quote, Sparkles } from "lucide-react";

export default function Blessings() {
  const blessings = [
    {
      who: "आई आणि बाबा",
      relation: "Parents",
      text: "संसाराच्या या नवीन प्रवासात तुम्हा दोघांना उदंड आयुष्य आणि सुख लाभो, हीच आमची ईश्वरचरणी प्रार्थना.",
      img: "/images/family/parents.jpg"
    },
    {
      who: "दादा आणि वाहिनी",
      relation: "Host",
      text: "नात्यांची ही रेशीमगाठ अशीच घट्ट राहो. तुमच्या सुखी संसारासाठी खूप खूप शुभेच्छा!",
      img: "/images/family/hosts.jpg"
    }
  ];

  return (
    <section className="relative py-24 px-4 bg-[#FDFCF0] overflow-hidden">
      {/* 1. Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/textures/floral-pattern.png')] bg-center bg-fixed" />
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 2. Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 text-mauli-gold mb-3">
            <Sparkles size={14} className="animate-pulse" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-black opacity-80 whitespace-nowrap">Divine Blessings</span>
            <Sparkles size={14} className="animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-marathi font-black text-wedding-maroon tracking-tight leading-tight">
            घरचा आशीर्वाद
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-[1.5px] w-10 md:w-14 bg-gradient-to-r from-transparent to-mauli-gold/40" />
            <Heart size={18} className="text-mauli-red fill-mauli-red opacity-30" />
            <div className="h-[1.5px] w-10 md:w-14 bg-gradient-to-l from-transparent to-mauli-gold/40" />
          </div>
        </motion.div>

        {/* 3. The Blessings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 px-2 md:px-0">
          {blessings.map((blessing, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative group p-8 md:p-14 rounded-[3rem] md:rounded-[3.5rem] bg-white border border-mauli-gold/15 border-b-[6px] hover:border-mauli-gold/30 transition-all duration-500 shadow-sm"
            >
              {/* Photo Frame Container */}
              <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto mb-8 md:mb-10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10px] md:inset-[-12px] rounded-full border-2 border-dashed border-mauli-gold/30 opacity-60" 
                />
                <div className="w-full h-full rounded-full border-[5px] md:border-[6px] border-white shadow-xl overflow-hidden relative z-10 ring-1 ring-mauli-gold/10">
                  <img 
                    src={blessing.img} 
                    alt={blessing.who} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(blessing.who)}&background=7c2d12&color=fff&size=256&bold=true`;
                    }}
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="relative space-y-6 text-center z-10">
                {/* Fixed Quote: Removed md:size and used Tailwind classes */}
                <Quote className="absolute -top-4 -left-2 text-mauli-gold/15 rotate-180 w-10 h-10 md:w-14 md:h-14" />
                
                <blockquote className="font-marathi text-xl md:text-2xl text-slate-700 font-bold italic leading-relaxed px-2 md:px-4">
                  "{blessing.text}"
                </blockquote>
                
                <div className="pt-6 flex flex-col items-center">
                  <p className="text-2xl font-marathi font-black text-wedding-maroon tracking-tight">
                    — {blessing.who}
                  </p>
                  <div className="px-5 py-1.5 mt-3 bg-mauli-gold/5 text-mauli-gold rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-mauli-gold/20">
                    {blessing.relation}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. Closing Ornament */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="h-20 w-px bg-gradient-to-b from-mauli-gold/40 to-transparent" />
          <ThreadKnot className="scale-110 md:scale-125 opacity-80" />
        </motion.div>
      </div>
    </section>
  );
}