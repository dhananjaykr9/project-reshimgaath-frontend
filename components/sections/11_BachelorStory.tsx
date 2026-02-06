"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Camera, Heart, User, Sparkles, Milestone, 
  Coffee, Ghost, GraduationCap, Users, Gem, 
  Image as LucideImage 
} from "lucide-react";
import { useState, useMemo, useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";

type Category = "All" | "Bachelor" | "Family" | "PhD" | "Events";

// Combined Data Structure with updated Folder paths
const SLIDESHOW_DATA = {
  parents: ["/images/family/parents/parents_1.jpg", "/images/family/parents/parents_2.jpg"],
  sister: ["/images/family/family/sister_1.jpg", "/images/family/family/sister_2.jpg"],
  brother: ["/images/family/family/brother_1.jpg", "/images/family/family/brother_2.jpg"],
  brotherVahini: ["/images/family/family/bv_1.jpg", "/images/family/family/bv_2.jpg"],
  putni: ["/images/family/family/putni_1.jpg", "/images/family/family/putni_2.jpg"],
  wholeFamily: ["/images/family/family/family_1.jpg", "/images/family/family/family_2.jpg", "/images/family/family/family_3.jpg"],
  bachelor: Array.from({ length: 10 }, (_, i) => `/images/family/bachelor/bachelor_${i + 1}.jpg`),
  relatives: ["/images/family/family/rel_1.jpg", "/images/family/family/rel_2.jpg", "/images/family/family/rel_3.jpg"],
  engagement: ["/images/family/events/eng_1.jpg", "/images/family/events/eng_2.jpg", "/images/family/events/eng_3.jpg"],
  prewedding: ["/images/family/events/pre_1.jpg", "/images/family/events/pre_2.jpg", "/images/family/events/pre_3.jpg"],
};

const BACHELOR_JOURNEY = [
  { id: "parents", category: "Family", images: SLIDESHOW_DATA.parents, title: "आई - बाबा", sub: "The Pillars", size: "tall" },
  { id: "phd", category: "PhD", src: "/images/family/phd/phd_degree.jpg", title: "डॉक्टर साहेब", sub: "PhD Achievement", size: "tall" },
  { id: "sister", category: "Family", images: SLIDESHOW_DATA.sister, title: "ताईची माया", sub: "Sister", size: "standard" },
  { id: "brother", category: "Family", images: SLIDESHOW_DATA.brother, title: "दादा - आधार", sub: "Brotherhood", size: "standard" },
  { id: "brotherVahini", category: "Family", images: SLIDESHOW_DATA.brotherVahini, title: "दादा - वहिनी", sub: "Support System", size: "tall" },
  { id: "putni", category: "Family", images: SLIDESHOW_DATA.putni, title: "पुतणीसोबत", sub: "Kaka's World", size: "standard" },
  { id: "wholeFamily", category: "Family", images: SLIDESHOW_DATA.wholeFamily, title: "पूर्ण कुटुंब", sub: "The Clan", size: "tall" },
  { id: "bachelor", category: "Bachelor", images: SLIDESHOW_DATA.bachelor, title: "बॅचलर डायरीज", sub: "Solo Journey", size: "tall" },
  { id: "relatives", category: "Family", images: SLIDESHOW_DATA.relatives, title: "नातेवाईक", sub: "Extended Family", size: "standard" },
  { id: "atya", category: "Family", src: "/images/family/family/atya.jpg", title: "आत्या", sub: "Father's Sisters", size: "standard" },
  { id: "engagement", category: "Events", images: SLIDESHOW_DATA.engagement, title: "साखरपुडा", sub: "The Promise", size: "tall" },
  { id: "prewedding", category: "Events", images: SLIDESHOW_DATA.prewedding, title: "नवे पर्व", sub: "Pre-Wedding", size: "tall" },
];

const FILTERS: { label: string; value: Category; icon: any }[] = [
  { label: "सर्व (All)", value: "All", icon: LucideImage },
  { label: "कुटुंब (Family)", value: "Family", icon: Users },
  { label: "प्रवास (Life)", value: "Bachelor", icon: Ghost },
  { label: "पदवी (PhD)", value: "PhD", icon: GraduationCap },
  { label: "नवी ओढ (Events)", value: "Events", icon: Gem },
];

const FloatingEmoji = ({ emoji, x, delay }: { emoji: string, x: string, delay: number }) => (
  <motion.div
    initial={{ y: "110vh", opacity: 0, x: 0 }}
    animate={{ 
      y: "-10vh", 
      opacity: [0, 1, 1, 0],
      x: [0, 25, -25, 0], 
      rotate: [0, 20, -20, 0],
      scale: [0.8, 1.2, 0.8]
    }}
    transition={{ 
      duration: 12, 
      repeat: Infinity, 
      delay, 
      ease: "linear",
      rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }}
    className="fixed pointer-events-none text-4xl z-0 select-none filter blur-[0.5px]"
    style={{ left: x }}
  >
    {emoji}
  </motion.div>
);

export default function BachelorStory() {
  const [filter, setFilter] = useState<Category>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const filteredPhotos = useMemo(() => 
    filter === "All" ? BACHELOR_JOURNEY : BACHELOR_JOURNEY.filter(p => p.category === filter),
  [filter]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-32 px-4 bg-wedding-paper/40 overflow-hidden">
      
      <FloatingEmoji emoji="🧿" x="8%" delay={0} />
      <FloatingEmoji emoji="🎓" x="88%" delay={2} />
      <FloatingEmoji emoji="❤️" x="18%" delay={5} />
      <FloatingEmoji emoji="🕺" x="78%" delay={7} />
      <FloatingEmoji emoji="📸" x="52%" delay={3} />
      <FloatingEmoji emoji="✨" x="35%" delay={8} />

      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
        <motion.div style={{ y: y1 }} className="absolute top-20 left-[5%] rotate-12"><Milestone size={180} /></motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-1/2 right-[5%] -rotate-12"><Coffee size={150} /></motion.div>
        <motion.div style={{ y: y1 }} className="absolute bottom-20 left-[10%]"><Ghost size={120} /></motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
             <Camera size={40} className="text-wedding-royal mb-4 drop-shadow-md" />
             <h2 className="text-5xl md:text-7xl font-marathi font-black text-wedding-maroon mb-3 tracking-tight">लग्नाआधीची गोष्ट...</h2>
             <p className="text-slate-500 font-marathi italic text-lg md:text-2xl">A bachelor's journey before the wedding bells.</p>
          </motion.div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {FILTERS.map((f, i) => (
            <motion.button
              key={f.value}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.value)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black transition-all border shadow-sm backdrop-blur-sm",
                filter === f.value 
                  ? "bg-wedding-royal text-white border-wedding-royal shadow-lg ring-2 ring-wedding-royal/20" 
                  : "bg-white/80 text-wedding-royal border-wedding-royal/10 hover:border-wedding-royal/30"
              )}
            >
              <f.icon size={16} className={cn(filter === f.value && "animate-pulse")} />
              {f.label}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                index={index} 
                isHovered={hoveredId === photo.id}
                onHover={setHoveredId}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center flex flex-col items-center"
        >
            <motion.div 
              animate={{ width: [0, 80, 60] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-1.5 bg-mauli-gold mb-10 rounded-full shadow-[0_0_15px_rgba(242,201,76,0.5)]" 
            />
            <blockquote className="font-marathi text-wedding-maroon text-3xl md:text-5xl font-black italic leading-tight max-w-4xl px-4">
              "आठवणींच्या हिंदोळ्यावर, बालपण पुन्हा जगले... <br className="hidden md:block"/> उद्याच्या सुखद प्रवासासाठी, मन आज पुन्हा सजले!"
            </blockquote>
            <motion.div 
              animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mt-8"
            >
              <Gem className="text-mauli-gold" size={32} />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const PhotoCard = memo(({ photo, index, isHovered, onHover }: any) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (photo.images && photo.images.length > 1) {
      const timer = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % photo.images.length);
      }, 3000 + (index * 200)); 
      return () => clearInterval(timer);
    }
  }, [photo.images, index]);

  const currentSrc = photo.images ? photo.images[imgIndex] : photo.src;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        "relative break-inside-avoid group overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] cursor-pointer shadow-lg border-4 border-white mb-4 transition-all duration-500 hover:shadow-2xl",
        photo.size === "tall" ? "aspect-[3/4.5]" : "aspect-[3/4]"
      )}
      onMouseEnter={() => onHover(photo.id)}
      onMouseLeave={() => onHover(null)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSrc}
          src={currentSrc}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s] ease-out"
        />
      </AnimatePresence>

      {photo.images && photo.images.length > 1 && (
        <div className="absolute top-4 right-4 flex gap-1 z-20 bg-black/30 p-1.5 rounded-full backdrop-blur-md border border-white/20">
          {photo.images.map((_: any, i: number) => (
            <div 
              key={i} 
              className={cn(
                "h-1 rounded-full transition-all duration-500", 
                imgIndex === i ? "bg-mauli-gold w-4" : "bg-white/40 w-1"
              )} 
            />
          ))}
        </div>
      )}

      <div className={cn(
        "absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-all duration-500",
        isHovered ? "bg-black/50" : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
      )}>
        <motion.div animate={{ y: isHovered ? 0 : 5 }}>
          <div className="flex items-center gap-2 mb-1">
             <Sparkles size={14} className="text-mauli-gold animate-pulse" />
             <p className="text-mauli-gold text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-md">
               {photo.sub}
             </p>
          </div>
          <h3 className="text-white font-marathi text-xl md:text-3xl font-black leading-tight drop-shadow-lg">
            {photo.title}
          </h3>
        </motion.div>
      </div>

      {/* Decorative inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/10" />
    </motion.div>
  );
});

PhotoCard.displayName = "PhotoCard";