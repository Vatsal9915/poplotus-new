"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function WhySwitchSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("why-switch-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="why-switch-section" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Why Switch To <span className="text-gold">PopLotus</span>?
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="relative">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left Benefits */}
            <div className="space-y-12">
              {/* Premium Quality */}
              <div
                className={`transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">Premium Quality</h3>
                    <p className="text-gray-600 leading-relaxed">We source the finest Foxnuts from trusted farms.</p>
                  </div>
                </div>
              </div>

              {/* Hand-Roasted Perfection */}
              <div
                className={`transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">Hand-Roasted Perfection</h3>
                    <p className="text-gray-600 leading-relaxed">Carefully roasted for the perfect crunch.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
              <div className="relative">
                <div className="w-full h-80 relative">
                  <Image
                    src="/makhana-foxnuts.png"
                    alt="Premium PopLotus Makhana on wooden board"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Benefits */}
            <div className="space-y-12">
              {/* Gluten-Free & Calcium-Rich */}
              <div
                className={`transform transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">Gluten-Free & Calcium-Rich</h3>
                    <p className="text-gray-600 leading-relaxed">
                      A light, nutritious snack packed with calcium and free from gluten.
                    </p>
                  </div>
                </div>
              </div>

              {/* Designed For Health-Conscious */}
              <div
                className={`transform transition-all duration-1000 delay-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-900 mb-2">
                      Designed For The Health-Conscious
                    </h3>
                    <p className="text-gray-600 leading-relaxed">Snacking should be tasty but guilt-free.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
