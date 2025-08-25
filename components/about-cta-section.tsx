"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AboutCtaSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("about-cta")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about-cta" className="py-20 bg-gradient-to-br from-gold via-yellow-600 to-yellow-500">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
            Join the PopLotus family.
            <span className="block text-yellow-100">Snack smart. Live better.</span>
          </h2>

          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Ready to transform your snacking experience? Discover our range of wholesome, delicious flavors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-white text-gold hover:bg-yellow-50 px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Explore Flavors
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gold px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 bg-transparent"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
