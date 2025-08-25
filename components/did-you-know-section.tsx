"use client"

import { useEffect, useState } from "react"

export default function DidYouKnowSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedNumbers, setAnimatedNumbers] = useState([0, 0, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate numbers when section becomes visible
          const targets = [80, 56, 90]
          targets.forEach((target, index) => {
            let current = 0
            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setAnimatedNumbers((prev) => {
                const newNumbers = [...prev]
                newNumbers[index] = Math.floor(current)
                return newNumbers
              })
            }, 30)
          })
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("did-you-know-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const statistics = [
    {
      number: animatedNumbers[0],
      text: "of Indians have Protein Deficit Diet which causes Muscle Loss",
    },
    {
      number: animatedNumbers[1],
      text: "of India's disease burden is due to Unhealthy Diet",
    },
    {
      number: animatedNumbers[2],
      text: "of processed snacks spike blood sugar, Makhana brings it down",
    },
  ]

  return (
    <section id="did-you-know-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">did you know that</h2>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Large Percentage */}
              <div className="mb-6">
                <span className="font-serif text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gold to-amber-600 bg-clip-text text-transparent">
                  {stat.number}%
                </span>
              </div>

              {/* Description Text */}
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-sm mx-auto">{stat.text}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              That's why choosing the right snacks matters. PopLotus provides nutrient-rich makhana that supports
              healthy growth and development.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-amber-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
