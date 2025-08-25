"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

const products = [
  {
    name: "Peri Peri",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
    color: "from-red-400 to-orange-400",
  },
  {
    name: "Himalayan Pink Salt",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
    color: "from-pink-400 to-teal-400",
  },
  {
    name: "Tomato Chilli",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-e42wl1pg20CJPPZLRzUwLGvYcaigew.png",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Cheese",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "Pudina",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
    color: "from-green-400 to-emerald-400",
  },
  {
    name: "Cream & Onion",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
    color: "from-green-300 to-teal-300",
  },
]

export default function Hero() {
  const [currentProduct, setCurrentProduct] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gold animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-gold animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gold animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          {/* Main Headline */}
          <div className="mb-8">
            <h2 className="font-sans text-lg md:text-xl lg:text-2xl font-medium text-gold mb-4 tracking-wide">
              HEALTHY SNACKING STARTS WITH
            </h2>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-amber-900 leading-none tracking-tight">
              PREMIUM
              <br />
              <span className="bg-gradient-to-r from-gold to-amber-600 bg-clip-text text-transparent">MAKHANA!</span>
            </h1>
          </div>

          {/* Product Image with Animation */}
          <div className="relative mb-12">
            <div className="relative w-96 h-[32rem] md:w-[28rem] md:h-[36rem] mx-auto">
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    index === currentProduct
                      ? "opacity-100 scale-100 rotate-0"
                      : index === (currentProduct - 1 + products.length) % products.length
                        ? "opacity-0 scale-95 -rotate-12"
                        : "opacity-0 scale-90 rotate-12"
                  }`}
                >
                  <div className="relative w-full h-full">
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-20 blur-3xl scale-110 animate-pulse`}
                    ></div>

                    {/* Product Image */}
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`PopLotus ${product.name} Makhana`}
                      fill
                      className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Product Name Indicator */}
            <div className="mt-6">
              <p className="text-xl md:text-2xl font-semibold text-amber-800 animate-fade-in">
                {products[currentProduct].name}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link href="/products">
              <Button className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-gold/25">
                BUY NOW
              </Button>
            </Link>
          </div>

          {/* Product Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProduct(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProduct ? "bg-gold scale-125" : "bg-gold/30 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 animate-float">
        <div className="w-4 h-4 bg-gold rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-1/3 right-12 animate-float delay-1000">
        <div className="w-6 h-6 bg-amber-400 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float delay-500">
        <div className="w-3 h-3 bg-orange-400 rounded-full opacity-50"></div>
      </div>
    </section>
  )
}
