"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VideoBanner() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      {/* Demo Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/premium-makhana-foxnuts.png"
        >
          <source src="/Final_video.mp4" type="video/mp4" />
          {/* Fallback gradient background */}
          <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-gold/20"></div>
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-none tracking-tight mb-8">
            PREMIUM
            <br />
            <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">MAKHANA!</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 drop-shadow-lg">
            Healthy snacking starts with premium quality
          </p>

          <Link href="/products">
            <Button className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
