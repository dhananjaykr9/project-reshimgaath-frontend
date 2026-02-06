// frontend/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Sahitya, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* 1. Configure Marathi Font (Body Text) */
const marathiFont = Sahitya({
  weight: ["400", "700"],
  subsets: ["devanagari"],
  variable: "--font-sahitya",
  display: "swap",
});

/* 2. Configure Sanskrit Font (Shlokas) */
const sanskritFont = Tiro_Devanagari_Hindi({
  weight: ["400"],
  subsets: ["devanagari"],
  variable: "--font-tiro",
  display: "swap",
});

/* 3. SEO Metadata */
export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  manifest: "/manifest.json",
};

/* 4. Viewport Configuration (CRITICAL for mobile & elders) */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FDFCF0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-wedding-paper antialiased",
          marathiFont.variable,
          sanskritFont.variable
        )}
      >
        {/* Global Paper Texture Overlay */}
        <div className="texture-overlay" />

        {children}
      </body>
    </html>
  );
}
