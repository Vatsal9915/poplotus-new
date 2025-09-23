"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VideoBanner() {
  return (
    <section className="relative w-full bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 top-16 h-[calc(100vh-4rem)]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/premium-makhana-foxnuts.png"
        >
          <source src="/Healthy_Cookie_Alternative_Video_Generated.mp4" type="video/mp4" />
          {/* Fallback background if video fails */}
          <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-gold/20"></div>
        </video>
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 pb-10 text-center">
        {/* 
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-tight tracking-tight mb-6">
          PREMIUM
          <br />
          <span
            className="text-yellow-300 drop-shadow-2xl"
            style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.8)" }}
          >
            MAKHANA!
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-2xl text-white/90 font-medium mb-8 drop-shadow-lg max-w-2xl">
          Healthy snacking starts with premium quality
        </p>
        */}

        <Link href="/products">
          <Button className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-lg md:text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
            SHOP NOW
          </Button>
        </Link>
      </div>
    </section>
  )
}
