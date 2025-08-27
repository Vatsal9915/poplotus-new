"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const products = [
  {
    name: "Peri Peri",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i3-eB5Y5J4ukxDJpzUigmr657K4eXCo9f.png",
    sectionId: "peri-peri-makhana-section",
  },
  {
    name: "Himalayan Pink Salt",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i5-yfCnUf1FKI6JyNvZl1Ti8rfQtvPM0R.png",
    sectionId: "himalayan-pink-salt-section",
  },
  {
    name: "Tomato Chilli",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i6-G5SSfmcCQLIMh8IAruCOYoKGAGCTC8.png",
    sectionId: "tomato-chilli-makhana-section",
  },
  {
    name: "Cheese",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i1-72aI8anoTMT8WZwOhJVtgxU9gvyzHY.png",
    sectionId: "cheese-makhana-section",
  },
  {
    name: "Pudina",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i4-4LY6SgdDt6AvVwGIbXwWTOr783dyGX.png",
    sectionId: "pudina-makhana-section",
  },
  {
    name: "Cream & Onion",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/i2-1bj3SWrMkvlOez9v6yHV1V89yqcOOw.png",
    sectionId: "cream-onion-makhana-section",
  },
]

export default function PackagingTransition() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentProduct, setCurrentProduct] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const totalWidth = window.innerWidth * products.length
    const scrollDistance = totalWidth - window.innerWidth

    // Section height = horizontal scroll distance + viewport height
    section.style.height = `${scrollDistance + window.innerHeight}px`

    const handleScroll = () => {
      const scrollTop = window.scrollY - section.offsetTop

      if (scrollTop >= 0 && scrollTop <= scrollDistance) {
        container.style.transform = `translateX(-${scrollTop}px)`
        const progress = scrollTop / scrollDistance
        const productIndex = Math.round(progress * (products.length - 1))
        setCurrentProduct(productIndex)
      } else if (scrollTop > scrollDistance) {
        container.style.transform = `translateX(-${scrollDistance}px)`
        setCurrentProduct(products.length - 1)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFlavorClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-black">
      <div
        ref={containerRef}
        className="sticky top-0 left-0 h-screen flex transition-transform duration-300 ease-out"
        style={{ width: `${products.length * 100}vw` }}
      >
        {products.map((product, index) => (
          <div
            key={product.name}
            className="w-screen h-screen relative flex items-center justify-center cursor-pointer group"
            onClick={() => handleFlavorClick(product.sectionId)}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={`PopLotus ${product.name} Makhana`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white z-10">
                <h3 className="font-serif text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">{product.name}</h3>
                <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">Premium Roasted Makhana</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                    Click to explore the flavor
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3 mb-4">
          {products.map((_, index) => (
            <span
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-500 ease-out border-2 ${
                index === currentProduct
                  ? "bg-white border-white scale-125 shadow-lg"
                  : "bg-transparent border-white/50"
              }`}
            />
          ))}
        </div>
        <p className="text-white text-sm text-center drop-shadow-lg">Click to explore flavors</p>
      </div>
    </section>
  )
}
