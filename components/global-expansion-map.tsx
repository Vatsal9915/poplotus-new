"use client"

import { useState } from "react"

const locations = [
  { name: "India", x: "65%", y: "45%", status: "active" },
  { name: "USA", x: "20%", y: "35%", status: "coming" },
  { name: "UK", x: "48%", y: "25%", status: "coming" },
  { name: "EU", x: "52%", y: "30%", status: "coming" },
  { name: "UAE", x: "58%", y: "40%", status: "coming" },
  { name: "Singapore", x: "75%", y: "55%", status: "coming" },
]

export default function GlobalExpansionMap() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Global Expansion</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bringing healthy snacking to the world, one country at a time.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl p-8 shadow-lg">
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden">
            {/* Simplified world map background */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 500">
              <path
                d="M150,200 Q200,150 300,180 Q400,160 500,200 Q600,180 700,200 Q800,160 850,200"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M100,300 Q200,280 300,300 Q400,320 500,300 Q600,280 700,320 Q800,300 900,320"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Location markers */}
            {locations.map((location, index) => (
              <div
                key={location.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: location.x, top: location.y }}
                onMouseEnter={() => setHoveredLocation(location.name)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    location.status === "active" ? "bg-green-500 animate-pulse" : "bg-amber-500 animate-bounce"
                  } shadow-lg`}
                ></div>

                {hoveredLocation === location.name && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                    {location.status === "active" ? "PopLotus is here!" : "PopLotus is reaching here"}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center mt-6 space-x-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Currently Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
