"use client"

import { useEffect, useState } from "react"

export default function SuperfoodSection() {
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

    const element = document.getElementById("superfood-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="superfood-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 tracking-wide">WHOLESOME SNACKING</h2>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* All in One */}
          <div
            className={`text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gold to-amber-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="w-16 h-16 border-4 border-white rounded-full group-hover:scale-110 transition-transform duration-300"></div>
              </div>
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">All in One</h3>
            <p className="text-gray-600 leading-relaxed">Increases Strength, Helps Lose Weight</p>
          </div>

          {/* Indian Heritage */}
          <div
            className={`text-center transform transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gold to-amber-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <svg
                  className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">Indian Heritage</h3>
            <p className="text-gray-600 leading-relaxed">Indian Heritage Food transformed into a Tasty snack</p>
          </div>

          {/* Delicious */}
          <div
            className={`text-center transform transition-all duration-1000 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gold to-amber-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <svg
                  className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">Delicious</h3>
            <p className="text-gray-600 leading-relaxed">
              We flavour our products with high quality ingredients to achieve an all-natural light snack
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
