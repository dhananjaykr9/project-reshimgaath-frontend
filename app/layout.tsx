// frontend/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Sahitya, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* 1. Marathi Font (Body Text) */
const marathiFont = Sahitya({
  weight: ["400", "700"],
  subsets: ["devanagari"],
  variable: "--font-sahitya",
  display: "swap",
});

/* 2. Sanskrit Font (Shlokas) */
const sanskritFont = Tiro_Devanagari_Hindi({
  weight: ["400"],
  subsets: ["devanagari"],
  variable: "--font-tiro",
  display: "swap",
});

/* 3. SEO Metadata - Updated for gavaskarwedding.live */
export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* 4. Viewport Configuration */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents accidental zooming during face scanning
  themeColor: "#FDFCF0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen bg-wedding-paper antialiased overflow-x-hidden font-marathi",
          marathiFont.variable,
          sanskritFont.variable
        )}
      >
        {/* Global Paper Texture Overlay 
            - Fixed at z-1 to sit behind content but over background
            - multiply mix-blend to feel like real paper grain
        */}
        <div 
          className="texture-overlay pointer-events-none fixed inset-0 z-[1] opacity-15 mix-blend-multiply" 
          aria-hidden="true"
        />

        {/* Main Content Container
            - Set to z-10 to ensure it stays above the texture grain
        */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Optional: For your Face Recognition service, 
            Next.js handles camera permissions better if the UI 
            isn't nested too deeply.
        */}
      </body>
    </html>
  );
}