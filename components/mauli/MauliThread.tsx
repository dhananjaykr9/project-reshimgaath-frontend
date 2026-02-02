"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useStore } from "@/lib/store";
import { useEffect, useState, useMemo } from "react";

export default function MauliThread() {
  const { isSadhaMode } = useStore();
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setDocHeight(document.documentElement.scrollHeight);
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll();
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const rawDistance = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const springDistance = useSpring(rawDistance, { stiffness: 100, damping: 30 });

  // Path logic: Locked to X=20 for a side-border aesthetic
  const wavyPath = useMemo(() => {
    const startX = 20; 
    let d = `M ${startX} 0`;
    const step = 100;
    for (let i = step; i <= docHeight; i += step) {
      // Very tiny variance to maintain 'handmade' feel
      const x = startX + (i % (step * 2) === 0 ? 0.5 : -0.5);
      d += ` L ${x} ${i}`;
    }
    d += ` L ${startX} ${docHeight}`;
    return d;
  }, [docHeight]);

  if (isSadhaMode) {
    return (
      <div className="fixed left-[4%] md:left-[5%] top-0 w-[1px] bg-mauli-red/10 h-full -z-10" />
    );
  }

  return (
    <div 
      className="fixed top-0 left-0 w-full pointer-events-none -z-10" 
      style={{ height: "100vh" }}
    >
      <svg
        className="absolute left-[2%] md:left-[5%] top-0 w-10 h-full overflow-visible"
        viewBox={`0 0 40 ${docHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mauliGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#B91C1C" />
            <stop offset="15%" stopColor="#166534" />
            <stop offset="35%" stopColor="#EAB308" />
            <stop offset="60%" stopColor="#4B5563" />
            <stop offset="85%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          <filter id="threadGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Ghost Trace */}
        <path
          d={wavyPath}
          fill="transparent"
          stroke="#E5E7EB"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          opacity="0.2"
        />

        {/* 2. Primary Glowing Path */}
        <motion.path
          d={wavyPath}
          fill="transparent"
          stroke="url(#mauliGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#threadGlow)"
          style={{ pathLength: scaleY }}
          className="opacity-40"
        />

        {/* 3. Twisted Detail Layer */}
        <motion.path
          d={wavyPath}
          fill="transparent"
          stroke="url(#mauliGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 5"
          style={{ pathLength: scaleY }}
          className="opacity-60"
        />

        {/* 4. Animated Tip Sparkle */}
        <motion.circle
          r="2.5"
          fill="#F2C94C"
          style={{ 
            offsetPath: `path('${wavyPath}')`,
            offsetDistance: springDistance
          }}
          className="shadow-[0_0_8px_#F2C94C]"
        />
      </svg>
    </div>
  );
}