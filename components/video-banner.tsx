"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VideoBanner() {
  return (
    <section className="relative w-full bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      {/* Video Container with aspect ratio */}
      <div className="relative w-full aspect-video sm:aspect-[21/9] lg:aspect-[16/6]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/premium-makhana-foxnuts.png"
        >
          <source src="/Healthy_Cookie_Alternative_Video_Generated.mp4" type="video/mp4" />
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight tracking-tight mb-4">
            PREMIUM
            <br />
            <span className="bg-gradient-to-r from-gold to-amber-400 bg-clip-text text-transparent">
              MAKHANA!
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-2xl text-white/90 font-medium mb-6 drop-shadow-lg max-w-2xl">
            Healthy snacking starts with premium quality
          </p>

          <Link href="/products">
            <Button className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-lg font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
