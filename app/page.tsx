"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Global Features
import MauliThread from "@/components/mauli/MauliThread";
import AudioPlayer from "@/components/features/AudioPlayer";
import SadhaModeToggle from "@/components/features/SadhaModeToggle";
import DeveloperInfo from "@/components/features/DeveloperInfo";

// Content Sections
import ShubhAarambh from "@/components/sections/01_ShubhAarambh";
import AmcheAple from "@/components/sections/02_AmcheAple";
import GreenDay from "@/components/sections/03_GreenDay";
import YellowDay from "@/components/sections/04_YellowDay";
import TheJourney from "@/components/sections/05_TheJourney";
import GrandFinale from "@/components/sections/06_GrandFinale";
import PhotoShodh from "@/components/sections/07_PhotoShodh";
import Blessings from "@/components/sections/08_Blessings";
import RSVP from "@/components/sections/09_RSVP";

export default function Home() {
  // Global Scroll Progress for the Sacred Thread/Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen w-full bg-wedding-paper selection:bg-mauli-gold/30 selection:text-wedding-maroon overflow-x-hidden">
      
      {/* 1. SACRED PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-mauli-red via-mauli-gold to-mauli-red origin-left z-[100] shadow-sm" 
        style={{ scaleX }} 
      />

      {/* 2. GLOBAL HUD (Floating Controls) */}
      <div className="fixed inset-0 pointer-events-none z-[80]">
        <MauliThread />
      </div>
      
      {/* Controls positioned to avoid thumb areas on mobile */}
      <div className="fixed bottom-6 left-6 z-[90] flex items-center gap-4">
        <SadhaModeToggle />
      </div>

      <div className="fixed bottom-6 right-6 z-[90]">
        <AudioPlayer />
      </div>

      {/* 3. GLOBAL TEXTURES & VIGNETTE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/textures/paper-grain.png')]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-paper/20 to-wedding-paper/40" />
      </div>

      {/* 4. MAIN INVITATION FLOW */}
      <article className="relative z-10 flex flex-col w-full">
        
        {/* Welcome Section - Full Viewport Entry */}
        <section id="welcome" className="w-full">
          <ShubhAarambh />
        </section>
        
        {/* Containerized Content for better readability on ultrawide screens */}
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          
          <section id="profiles" className="w-full">
            <AmcheAple />
          </section>
          
          {/* THE SACRED TIMELINE (Day 1 - Day 3) */}
          <div className="relative w-full">
             <GreenDay />
             <YellowDay />
             <TheJourney />
          </div>

          {/* WEDDING DAY (Grand Finale) */}
          <section id="finale" className="w-full relative z-20">
            <GrandFinale />
          </section>
          
          {/* INTERACTIVE GUEST TOOLS */}
          <div className="relative py-12 space-y-12 bg-gradient-to-b from-transparent via-mauli-gold/[0.02] to-transparent">
            <PhotoShodh />
            <Blessings />
            <RSVP />
          </div>
        </div>

        {/* 5. FOOTER & DEVELOPER SIGNATURE */}
        <footer className="relative z-[50] mt-12 bg-wedding-paper border-t border-mauli-gold/10">
           <DeveloperInfo />
        </footer>
      </article>

      {/* Hidden SEO & Accessibility Metadata */}
      <div className="sr-only">
        <h1>Wedding Invitation of Atul Gavaskar and Vaishnavi</h1>
        <p>Celebrating our union on February 26th, 2026, in Chandrapur.</p>
      </div>
    </main>
  );
}