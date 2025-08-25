"use client"

import { useEffect, useRef } from "react"

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded with a vision to revolutionize healthy snacking in India",
  },
  {
    year: "2021",
    title: "First Product Launch",
    description: "Introduced our signature Classic Roasted Makhana to local markets",
  },
  {
    year: "2022",
    title: "Flavor Innovation",
    description: "Expanded our range with Spicy Masala and Chocolate Coated varieties",
  },
  {
    year: "2023",
    title: "National Expansion",
    description: "Reached 50+ cities across India with our premium makhana collection",
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description: "Launched our e-commerce platform and direct-to-consumer model",
  },
  {
    year: "2025",
    title: "Future Vision",
    description: "Expanding internationally while maintaining our commitment to quality and sustainability",
  },
]

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const milestoneElements = timelineRef.current?.querySelectorAll(".milestone-card")
    milestoneElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-beige/5 to-beige/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={timelineRef}>
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From a small idea to a growing brand, here's how PopLotus has evolved over the years
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-gold to-gold shadow-[0_0_30px_rgba(212,175,55,0.6)] opacity-90"></div>

          {milestones.map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-white shadow-lg ring-4 ring-gold/30 z-10"
              style={{
                top: `${index * 16.66 + 8}%`,
              }}
            ></div>
          ))}

          <div className="space-y-24">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="milestone-card relative opacity-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`flex ${index % 2 === 0 ? "justify-start pr-8" : "justify-end pl-8"}`}>
                  <div className="w-full max-w-md">
                    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gold/30 hover:shadow-2xl hover:border-gold/50 transition-all duration-500 transform hover:-translate-y-2 group relative">
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gold/60 ${
                          index % 2 === 0 ? "right-0 translate-x-full" : "left-0 -translate-x-full"
                        }`}
                      ></div>

                      <div className="flex items-center mb-4">
                        <span className="font-serif text-3xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
                          {milestone.year}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3 group-hover:text-gold transition-colors duration-300">
                        {milestone.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
