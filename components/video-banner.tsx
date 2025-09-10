"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VideoBanner() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      {/* Responsive Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/premium-makhana-foxnuts.png"
        >
          <source src="/Healthy_Cookie_Alternative_Video_Generated.mp4" type="video/mp4" />
          {/* Fallback gradient */}
          <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-gold/20"></div>
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-tight tracking-tight mb-6">
          PREMIUM
          <br />
          <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
            MAKHANA!
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-10 drop-shadow-lg max-w-2xl">
          Healthy snacking starts with premium quality
        </p>

        <Link href="/products">
          <Button className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
            SHOP NOW
          </Button>
        </Link>
      </div>
    </section>
  )
}
