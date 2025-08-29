"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"

// Counter Component (Optimized)
const Counter = ({ end, duration, suffix }: { end: number; duration: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration])
  return <span>{count}{suffix}</span>
}

export default function SustainabilityPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Constant Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/farming.jpg"
          alt="Background farming"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
      </div>

      {/* Overlay for darkening */}
      <div className="fixed inset-0 bg-black/40 z-0" />

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-hidden">
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-6xl font-bold text-gold drop-shadow-lg"
            >
              Sustainability at PopLotus
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-6 max-w-2xl text-lg text-gray-200"
            >
              From farm to shelf, we ensure every step is sustainable, ethical, and responsible.
            </motion.p>
          </section>

          {/* Our Mission */}
          <section className="py-24 text-center px-6 bg-black/40">
            <h2 className="text-4xl font-semibold text-gold">Our Mission</h2>
            <p className="mt-6 max-w-3xl mx-auto text-gray-200">
              At PopLotus, we’re redefining healthy snacking by supporting local farmers, using eco-friendly packaging, and reducing carbon footprint. Every pack you open contributes to a greener tomorrow.
            </p>
          </section>

          {/* Sustainability Pillars */}
          <section className="py-24 px-6 grid md:grid-cols-3 gap-10 text-center bg-black/40">
            {[
              { title: "Supporting Farmers", desc: "We work directly with farmers to ensure fair trade and sustainable sourcing." },
              { title: "Eco-Friendly Packaging", desc: "Our packaging is designed to minimize waste and maximize recyclability." },
              { title: "Carbon Footprint", desc: "We are committed to reducing emissions across our supply chain." }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-gold/30 hover:border-gold transition"
              >
                <h3 className="text-2xl font-semibold text-gold">{pillar.title}</h3>
                <p className="mt-4 text-gray-200">{pillar.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Impact Numbers */}
          <section className="py-24 text-center px-6 bg-black/40">
            <h2 className="text-4xl font-semibold text-gold">Our Impact</h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <span className="text-5xl font-bold text-gold"><Counter end={500} duration={2} suffix="+" /></span>
                <p className="mt-2 text-gray-200">Farmers Empowered</p>
              </div>
              <div>
                <span className="text-5xl font-bold text-gold"><Counter end={100} duration={2} suffix="%" /></span>
                <p className="mt-2 text-gray-200">Eco-Friendly Packaging</p>
              </div>
              <div>
                <span className="text-5xl font-bold text-gold"><Counter end={20} duration={2} suffix=" tons" /></span>
                <p className="mt-2 text-gray-200">CO₂ Saved Annually</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-24 text-center px-6 bg-black/60">
            <h2 className="text-4xl font-semibold text-gold">Join Our Mission</h2>
            <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
              Be a part of the PopLotus sustainability journey. Together, we can create a healthier planet.
            </p>
            <a
              href="https://poplotus-new.vercel.app/contact"
              className="mt-8 inline-block px-8 py-4 bg-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
            >
              Partner with Us
            </a>
          </section>
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  )
}
