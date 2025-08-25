"use client"

import { useEffect, useState } from "react"

export default function MissionVisionBlock() {
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

    const element = document.getElementById("mission-vision")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="mission-vision" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl mr-4">
                  🌱
                </div>
                <h3 className="text-2xl font-serif text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To craft wholesome, innovative snacks that empower healthier lifestyles without compromising on taste.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl mr-4">
                  🌍
                </div>
                <h3 className="text-2xl font-serif text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become a global brand that makes mindful snacking mainstream.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
