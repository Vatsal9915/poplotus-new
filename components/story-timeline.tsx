"use client"

import { useEffect, useRef, useState } from "react"

const timelineStages = [
  {
    title: "The Idea",
    description: "Born from a vision to revolutionize healthy snacking in India with traditional lotus seeds.",
    icon: "🌱",
    year: "2020",
  },
  {
    title: "The First Flavors",
    description: "Crafted our signature recipes, perfecting the balance of taste and nutrition.",
    icon: "🥄",
    year: "2021",
  },
  {
    title: "Expanding Reach",
    description: "Growing across India, bringing wholesome snacking to every household.",
    icon: "🌍",
    year: "2023",
  },
  {
    title: "The Future",
    description: "Global expansion with sustainable practices and innovative flavors.",
    icon: "🚀",
    year: "2025",
  },
]

export default function StoryTimeline() {
  const [visibleStages, setVisibleStages] = useState<number[]>([])
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleStages((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    stageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Story Timeline</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From a simple idea to a growing brand, discover how PopLotus evolved into your favorite healthy snack.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 rounded-full transform -translate-y-1/2"></div>
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200 via-orange-300 to-amber-200 rounded-full"></div>

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {timelineStages.map((stage, index) => (
              <div
                key={index}
                ref={(el) => (stageRefs.current[index] = el)}
                data-index={index}
                className={`relative transition-all duration-700 ${
                  visibleStages.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 left-4 md:left-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg z-10">
                  {stage.icon}
                </div>

                {/* Content card */}
                <div
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:mt-20" : "md:mb-20"
                  }`}
                >
                  <div className="text-sm font-medium text-amber-600 mb-2">{stage.year}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{stage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
