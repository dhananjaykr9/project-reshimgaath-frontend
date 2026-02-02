"use client";

import { useState, useRef } from "react";
import { Camera, Search, Image as ImageIcon, Loader2, Sparkles, RefreshCw, CheckCircle2, Download, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThreadKnot from "../mauli/ThreadKnot";

export default function PhotoShodh() {
  const [state, setState] = useState<"IDLE" | "SCANNING" | "RESULTS">("IDLE");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setState("SCANNING");
      
      setTimeout(() => {
        setState("RESULTS");
      }, 3500);
    }
  };

  return (
    <section className="relative py-24 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background Decorative Auras */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wedding-royal/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mauli-gold/5 rounded-full blur-[120px] -z-10" />

      {/* 1. Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <div className="flex items-center justify-center gap-2.5 text-mauli-gold mb-2">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Sparkles size={18} />
          </motion.div>
          <span className="uppercase tracking-[0.4em] text-[10px] font-black">AI Facial Recognition</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-marathi font-black text-wedding-maroon tracking-tight leading-tight">
          स्मार्ट फोटो शोध
        </h2>
        <p className="text-gray-600 font-marathi text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-90 italic">
          लग्नाच्या हजारो फोटोंमध्ये स्वतःला शोधणे आता सोपे झाले आहे. <br className="hidden md:block"/>फक्त एक सेल्फी अपलोड करा!
        </p>
        <div className="pt-4">
          <ThreadKnot className="mx-auto scale-125" />
        </div>
      </motion.div>

      {/* 2. Main AI Container */}
      <div className="bg-white rounded-[3.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.1)] border border-mauli-gold/15 overflow-hidden min-h-[550px] relative">
        
        <AnimatePresence mode="wait">
          {/* STATE: IDLE (Upload UI) */}
          {state === "IDLE" && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-gradient-to-br from-wedding-paper/30 via-white to-white"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-32 h-32 bg-wedding-royal/5 rounded-[2.5rem] flex items-center justify-center mb-10 border-2 border-dashed border-wedding-royal/20 relative shadow-inner"
              >
                <Camera size={48} className="text-wedding-royal" />
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-3 -right-3 bg-mauli-gold text-white p-2.5 rounded-2xl shadow-xl ring-4 ring-white"
                >
                  <Sparkles size={18} />
                </motion.div>
              </motion.div>
              
              <h3 className="text-4xl font-marathi font-black text-slate-800 mb-4 tracking-tight">तुमचा चेहरा ओळखा</h3>
              <p className="text-slate-500 mb-10 max-w-sm leading-relaxed font-medium">प्रगत न्यूरल नेटवर्क तंत्रज्ञानाचा वापर करून आम्ही तुमचे फोटो क्षणार्धात शोधून काढू.</p>
              
              <label className="group relative cursor-pointer overflow-hidden bg-wedding-royal text-white px-10 py-5 rounded-[1.5rem] font-black shadow-[0_20px_50px_rgba(26,35,126,0.3)] transition-all hover:scale-[1.02] flex items-center gap-4">
                <ImageIcon size={22} className="group-hover:rotate-6 transition-transform" />
                <span className="tracking-wide text-sm md:text-base">फोटो अपलोड करा / सेल्फी घ्या</span>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </label>
            </motion.div>
          )}

          {/* STATE: SCANNING (Processing UI) */}
          {state === "SCANNING" && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1e] text-white z-20"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
                {preview && <img src={preview} alt="Scanning" className="w-full h-full object-cover rounded-[3rem] opacity-30 grayscale blur-[1px]" />}
                
                {/* AI Laser Scanner */}
                <motion.div 
                  animate={{ top: ["5%", "92%", "5%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-6 right-6 h-[2px] bg-mauli-gold shadow-[0_0_20px_#D4AF37,0_0_40px_#D4AF37] z-30"
                >
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-mauli-gold rounded-full blur-sm" />
                </motion.div>
                
                {/* Biometric Corners */}
                <div className="absolute inset-0 border border-mauli-gold/10 rounded-[3rem] m-4" />
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-mauli-gold rounded-tl-[2rem]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-mauli-gold rounded-br-[2rem]" />
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <Loader2 size={32} className="animate-spin text-mauli-gold" />
                  <p className="font-marathi text-3xl font-black tracking-widest text-white">मॅच शोधत आहे...</p>
                </div>
                <div className="px-6 py-1.5 bg-white/5 rounded-full border border-white/10">
                  <p className="text-[9px] text-white/50 uppercase tracking-[0.5em] font-black">Analyzing 4,200+ Event Photos</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATE: RESULTS (Gallery UI) */}
          {state === "RESULTS" && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 h-full flex flex-col"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl border-4 border-white p-1 bg-white shadow-2xl rotate-3">
                      {preview && <img src={preview} alt="Target" className="w-full h-full object-cover rounded-xl" />}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                       शोध यशस्वी!
                    </h3>
                    <p className="text-green-600 font-marathi text-xl font-bold">तुम्हाला ८ फोटोंमध्ये टॅग केले आहे</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => { setState("IDLE"); setPreview(null); }}
                  className="group flex items-center gap-3 px-8 py-4 text-sm text-wedding-maroon font-black bg-wedding-maroon/5 rounded-2xl hover:bg-wedding-maroon/10 transition-all border border-transparent hover:border-wedding-maroon/10"
                >
                  <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" /> 
                  पुन्हा शोधा
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto pr-4 custom-scrollbar max-h-[650px]">
                {[1,2,3,4,5,6,7,8].map((n) => (
                  <motion.div 
                    key={n}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: n * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative aspect-[3/4] bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border-2 border-white"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt="Result Match"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                      <div className="flex flex-col">
                        <span className="text-mauli-gold text-[8px] uppercase font-black tracking-widest mb-1">Match: 98.4%</span>
                        <span className="text-white text-sm font-black font-marathi">मेहंदी सोहळा</span>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3.5 bg-white text-wedding-royal rounded-2xl shadow-xl transition-all"
                      >
                        <Download size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Privacy Badge */}
      <div className="flex items-center justify-center gap-3 mt-12 px-6 py-3 bg-slate-50 border border-slate-100 rounded-full max-w-fit mx-auto">
        <ShieldCheck size={18} className="text-green-600" />
        <p className="text-center text-xs font-medium text-slate-500">
          तुमची प्रायव्हसी आमची जबाबदारी. आम्ही तुमचे फोटो सेव्ह करत नाही.
        </p>
      </div>
    </section>
  );
}