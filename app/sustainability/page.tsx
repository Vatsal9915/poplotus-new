"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Leaf, Recycle, Users, Target, Award, Globe, Heart, Sprout } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// 🔹 Counter Component for animated stats
function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration * 60)
    const interval = setInterval(() => {
      start += increment
      if (start >= end) {
        clearInterval(interval)
        setCount(end)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(interval)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section with Parallax */}
        <section
          className="relative h-screen bg-fixed bg-center bg-cover flex items-center justify-center text-center px-6"
          style={{ backgroundImage: "url('/farming.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-3xl"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Leaf className="w-12 h-12 text-green-400" />
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white">
                Our Sustainability Vision
              </h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              At PopLotus, we believe in creating delicious snacks while nurturing our planet and
              communities. Our commitment to sustainability drives every decision we make, from sourcing to packaging.
            </p>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-16 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gold/10 to-yellow-100 rounded-2xl p-12 text-center">
              <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                "Nourishing People, Nurturing Planet"
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                We are committed to creating a sustainable future where healthy snacking goes
                hand-in-hand with environmental stewardship. Through responsible sourcing,
                eco-friendly practices, and community empowerment, we're building a business that benefits everyone.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Key Pillars */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-gradient-to-br from-amber-50 to-orange-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Sustainability Pillars
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four core principles guide our sustainable practices and long-term vision
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Sprout className="w-8 h-8 text-green-600" />,
                  bg: "bg-green-100 group-hover:bg-green-200",
                  title: "Sustainable Sourcing",
                  text: "Direct partnerships with farmers practicing organic and regenerative agriculture methods",
                },
                {
                  icon: <Recycle className="w-8 h-8 text-blue-600" />,
                  bg: "bg-blue-100 group-hover:bg-blue-200",
                  title: "Eco-Friendly Packaging",
                  text: "Biodegradable and recyclable packaging materials to minimize environmental impact",
                },
                {
                  icon: <Users className="w-8 h-8 text-purple-600" />,
                  bg: "bg-purple-100 group-hover:bg-purple-200",
                  title: "Community Impact",
                  text: "Empowering local farming communities through fair trade and skill development programs",
                },
                {
                  icon: <Target className="w-8 h-8 text-gold" />,
                  bg: "bg-gold/20 group-hover:bg-gold/30",
                  title: "Carbon Neutral Goals",
                  text: "Working towards carbon neutrality through renewable energy and offset programs",
                },
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500 text-center group"
                >
                  <div className={`w-16 h-16 ${pillar.bg} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}>
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Impact Statistics */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact So Far</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Measurable progress towards a more sustainable future
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  <Counter end={500} />+
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Farmers Supported</div>
                <p className="text-gray-600">Direct partnerships ensuring fair wages and sustainable practices</p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  <Counter end={75} />%
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Packaging Recyclable</div>
                <p className="text-gray-600">Moving towards 100% sustainable packaging by 2025</p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  <Counter end={10000} />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Trees Planted</div>
                <p className="text-gray-600">Contributing to reforestation and carbon offset initiatives</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 🌍 Global Reach with Spline Globe */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[90vh] bg-gradient-to-b from-white to-green-50 overflow-hidden"
        >
          <iframe
            src="https://my.spline.design/holographicearthwithdynamiclines-7pl8xHK4WPjFkUiWQTkwSzKg/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>

          {/* Overlay Text */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-green-700 drop-shadow-lg">
              Our Global Vision
            </h2>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md">
              From India to the world — PopLotus is spreading mindful snacking
              across the USA, UK, EU, UAE, and beyond, while staying committed to
              sustainability.
            </p>
          </div>
        </motion.section>

        {/* Sustainable Practices */}
        {/* (Your existing code continues unchanged from here) */}
      </main>
      <Footer />
    </div>
  )
}
