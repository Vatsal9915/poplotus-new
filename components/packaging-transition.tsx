"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const products = [
  {
    name: "Peri Peri",
    image: "/peri.webp",
    sectionId: "peri-peri-makhana-section",
  },
  {
    name: "Himalayan Pink Salt",
    image: "/pink-salt.webp",
    sectionId: "himalayan-pink-salt-section",
  },
  {
    name: "Tomato Chilli",
    image: "/tomato.webp",
    sectionId: "tomato-chilli-makhana-section",
  },
  {
    name: "Cheese",
    image: "/cheese.webp",
    sectionId: "cheese-makhana-section",
  },
  {
    name: "Pudina",
    image: "/pudina.webp",
    sectionId: "pudina-makhana-section",
  },
  {
    name: "Cream & Onion",
    image: "/creamnonion.webp",
    sectionId: "cream-onion-makhana-section",
  },
]

export default function PackagingTransition() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentProduct, setCurrentProduct] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    if (isMobile) {
      section.style.height = "auto"
      return
    }

    const sectionHeight = window.innerHeight * products.length
    section.style.height = `${sectionHeight}px`

    const handleScroll = () => {
      const scrollTop = window.scrollY - section.offsetTop
      const slideHeight = window.innerHeight

      if (scrollTop >= 0 && scrollTop < sectionHeight) {
        // Calculate which slide should be shown based on scroll position
        const slideIndex = Math.floor(scrollTop / slideHeight)
        const clampedIndex = Math.max(0, Math.min(slideIndex, products.length - 1))

        // Discrete slide transition - no smooth animation
        const translateX = -clampedIndex * window.innerWidth
        container.style.transform = `translateX(${translateX}px)`
        setCurrentProduct(clampedIndex)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  const handleFlavorClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={sectionRef} className="relative w-full bg-black">
      {isMobile ? (
        // Mobile: Simple vertical stack
        <div className="space-y-0">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="w-full h-screen relative flex items-center justify-center cursor-pointer"
              onClick={() => handleFlavorClick(product.sectionId)}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`PopLotus ${product.name} Makhana`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      ) : (
        // Desktop: Discrete slide transition
        <div
          ref={containerRef}
          className="sticky top-0 left-0 h-screen flex"
          style={{ width: `${products.length * 100}vw` }}
        >
          {products.map((product, index) => (
            <div
              key={product.name}
              className="w-screen h-screen relative flex items-center justify-center cursor-pointer"
              onClick={() => handleFlavorClick(product.sectionId)}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`PopLotus ${product.name} Makhana`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      )}

      {!isMobile && (
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 px-4">
          <div className="flex space-x-2 sm:space-x-3 justify-center">
            {products.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 border-2 ${
                  index === currentProduct
                    ? "bg-white border-white scale-125 shadow-lg"
                    : "bg-transparent border-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
