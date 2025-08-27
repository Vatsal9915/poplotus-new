"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const products = [
  {
    name: "Peri Peri",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i3-eB5Y5J4ukxDJpzUigmr657K4eXCo9f.png",
    color: "from-red-400 to-orange-400",
    bgColor: "from-red-50 to-orange-50",
    sectionId: "peri-peri-makhana-section",
  },
  {
    name: "Himalayan Pink Salt",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i5-yfCnUf1FKI6JyNvZl1Ti8rfQtvPM0R.png",
    color: "from-pink-400 to-teal-400",
    bgColor: "from-pink-50 to-teal-50",
    sectionId: "himalayan-pink-salt-section",
  },
  {
    name: "Tomato Chilli",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i6-G5SSfmcCQLIMh8IAruCOYoKGAGCTC8.png",
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-50 to-orange-50",
    sectionId: "tomato-chilli-makhana-section",
  },
  {
    name: "Cheese",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i1-72aI8anoTMT8WZwOhJVtgxU9gvyzHY.png",
    color: "from-yellow-400 to-orange-400",
    bgColor: "from-yellow-50 to-orange-50",
    sectionId: "cheese-makhana-section",
  },
  {
    name: "Pudina",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i4-4LY6SgdDt6AvVwGIbXwWTOr783dyGX.png",
    color: "from-green-400 to-emerald-400",
    bgColor: "from-green-50 to-emerald-50",
    sectionId: "pudina-makhana-section",
  },
  {
    name: "Cream & Onion",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i2-1bj3SWrMkvlOez9v6yHV1V89yqcOOw.png",
    color: "from-green-300 to-teal-300",
    bgColor: "from-green-50 to-teal-50",
    sectionId: "cream-onion-makhana-section",
  },
]

export default function PackagingTransition() {
  const [currentProduct, setCurrentProduct] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (typeof window === "undefined") return

      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)

      const sectionHeight = window.innerHeight * 1.5 // Reduced from products.length to 1.5
      const scrollProgress = Math.min(scrollPosition / sectionHeight, 1)
      const productIndex = Math.floor(scrollProgress * products.length)
      setCurrentProduct(Math.min(productIndex, products.length - 1))
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getHorizontalOffset = () => {
    if (typeof window === "undefined") return 0

    const sectionHeight = window.innerHeight * 1.5
    const scrollProgress = Math.min(scrollY / sectionHeight, 1)
    return scrollProgress * (products.length - 1) * -100
  }

  const handleProductClick = (product: any) => {
    const targetElement = document.getElementById(product.sectionId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-black" style={{ height: "100vh" }}>
      {" "}
      {/* Reduced section height from 250vh to 150vh */}
      <div className="sticky top-0 h-screen">
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${getHorizontalOffset()}vw)`,
            width: `${products.length * 100}vw`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.name}
              className="w-screen h-full relative cursor-pointer group"
              onClick={() => handleProductClick(product)}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`PopLotus ${product.name} Makhana`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={index === 0}
              />

              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center text-white z-10">
                  <h3 className="font-serif text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">{product.name}</h3>
                  <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">Premium Roasted Makhana</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                      Click to explore this flavor
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3 mb-4">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const targetScroll = (index / (products.length - 1)) * window.innerHeight * 1.5 // Updated scroll calculation to match reduced section height
                    window.scrollTo({ top: targetScroll, behavior: "smooth" })
                  }
                }}
                className={`w-4 h-4 rounded-full transition-all duration-500 ease-out border-2 ${
                  index === currentProduct
                    ? "bg-white border-white scale-125 shadow-lg"
                    : "bg-transparent border-white/50 hover:border-white hover:scale-110"
                }`}
              />
            ))}
          </div>
          <p className="text-white text-sm text-center drop-shadow-lg">Scroll to explore flavors • Click to shop</p>
        </div>
      </div>
    </section>
  )
}
