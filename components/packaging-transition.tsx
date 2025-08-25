"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const products = [
  {
    name: "Peri Peri",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
    color: "from-red-400 to-orange-400",
    bgColor: "from-red-50 to-orange-50",
    sectionId: "peri-peri-makhana-section",
  },
  {
    name: "Himalayan Pink Salt",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
    color: "from-pink-400 to-teal-400",
    bgColor: "from-pink-50 to-teal-50",
    sectionId: "himalayan-pink-salt-section",
  },
  {
    name: "Tomato Chilli",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-e42wl1pg20CJPPZLRzUwLGvYcaigew.png",
    color: "from-red-500 to-orange-500",
    bgColor: "from-red-50 to-orange-50",
    sectionId: "tomato-chilli-makhana-section",
  },
  {
    name: "Cheese",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
    color: "from-yellow-400 to-orange-400",
    bgColor: "from-yellow-50 to-orange-50",
    sectionId: "cheese-makhana-section",
  },
  {
    name: "Pudina",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
    color: "from-green-400 to-emerald-400",
    bgColor: "from-green-50 to-emerald-50",
    sectionId: "pudina-makhana-section",
  },
  {
    name: "Cream & Onion",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
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

      const sectionHeight = window.innerHeight * 0.6
      const productIndex = Math.floor(scrollPosition / sectionHeight) % products.length
      setCurrentProduct(productIndex)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getTransitionProgress = () => {
    if (typeof window === "undefined") return 0

    const sectionHeight = window.innerHeight * 0.6
    const currentSection = Math.floor(scrollY / sectionHeight)
    const progressInSection = (scrollY % sectionHeight) / sectionHeight
    return Math.sin(progressInSection * Math.PI * 0.5)
  }

  if (!mounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50" style={{ minHeight: "360vh" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Premium Flavors</h2>
            <p className="text-lg text-amber-700 mb-12">Discover the perfect taste for every craving</p>
            <div className="relative w-80 h-96 md:w-96 md:h-[28rem] mx-auto">
              <Image
                src={products[0].image || "/placeholder.svg"}
                alt={`PopLotus ${products[0].name} Makhana`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const transitionProgress = getTransitionProgress()

  const handleProductClick = (product: any) => {
    const targetElement = document.getElementById(product.sectionId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section
      className={`py-20 bg-gradient-to-br transition-all duration-1000 ease-out ${products[currentProduct].bgColor}`}
      style={{ minHeight: `${products.length * 60}vh` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-20">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Premium Flavors</h2>
          <p className="text-lg text-amber-700 mb-12">Discover the perfect taste for every craving</p>

          <div className="relative mb-12">
            <div
              className="relative w-80 h-96 md:w-96 md:h-[28rem] mx-auto cursor-pointer group"
              onClick={() => handleProductClick(products[currentProduct])}
            >
              {products.map((product, index) => {
                const isActive = index === currentProduct
                const isPrevious = index === (currentProduct - 1 + products.length) % products.length
                const isNext = index === (currentProduct + 1) % products.length

                let opacity = 0
                let scale = 0.8
                let rotation = 0
                let translateY = 0

                if (isActive) {
                  opacity = 1 - transitionProgress * 0.2
                  scale = 1 - transitionProgress * 0.05
                  rotation = transitionProgress * -3
                  translateY = transitionProgress * -10
                } else if (isNext && transitionProgress > 0.3) {
                  const nextProgress = (transitionProgress - 0.3) * 1.43
                  opacity = nextProgress * 0.8
                  scale = 0.8 + nextProgress * 0.2
                  rotation = (1 - nextProgress) * 10
                  translateY = (1 - nextProgress) * 20
                }

                return (
                  <div
                    key={product.name}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      opacity,
                      transform: `scale(${scale}) rotate(${rotation}deg) translateY(${translateY}px)`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-15 blur-2xl scale-105 transition-all duration-700`}
                        style={{
                          animationDuration: `${3 + index * 0.3}s`,
                          animation: isActive ? "pulse 4s ease-in-out infinite" : "none",
                        }}
                      ></div>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`PopLotus ${product.name} Makhana`}
                        fill
                        className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                )
              })}

              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm text-amber-600 bg-white/80 px-3 py-1 rounded-full">
                  Click to explore this flavor
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p
                className="text-2xl font-semibold text-amber-800 transition-all duration-700 ease-out"
                style={{
                  opacity: 1 - transitionProgress * 0.3,
                  transform: `translateY(${transitionProgress * 5}px)`,
                }}
              >
                {products[currentProduct].name}
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const targetScroll = index * window.innerHeight * 0.6
                    window.scrollTo({ top: targetScroll, behavior: "smooth" })
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                  index === currentProduct
                    ? "bg-gold scale-125 shadow-lg"
                    : "bg-gold/30 hover:bg-gold/50 hover:scale-110"
                }`}
              />
            ))}
          </div>

          <div className="mt-8">
            <div className="w-32 h-1 bg-gold/20 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                style={{ width: `${transitionProgress * 100}%` }}
              />
            </div>
            <p className="text-sm text-amber-600 mt-2">Scroll to explore flavors • Click to shop</p>
          </div>
        </div>
      </div>
    </section>
  )
}
