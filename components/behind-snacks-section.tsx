"use client"

import { useState } from "react"

const processSteps = [
  {
    title: "Sourcing",
    description: "Premium lotus seeds from trusted farms",
    image: "/makhana-harvest.png",
  },
  {
    title: "Roasting",
    description: "Hand-roasted to perfection for optimal crunch",
    image: "/traditional-makhana-roasting.png",
  },
  {
    title: "Flavoring",
    description: "Natural spices and seasonings carefully applied",
    image: "/flavored-makhana-spices.png",
  },
  {
    title: "Packaging",
    description: "Eco-friendly packaging to preserve freshness",
    image: "/eco-friendly-snacks.png",
  },
]

export default function BehindSnacksSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-br from-beige/10 to-beige/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Behind the Snacks</h2>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600 font-medium mb-4">
            From Farm to Flavor – Crafted with Care
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the meticulous process behind every PopLotus snack.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Process steps */}
          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "bg-white shadow-lg scale-105 border border-gold/30"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                      activeStep === index ? "bg-gradient-to-r from-gold to-yellow-600" : "bg-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active step image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={processSteps[activeStep].image || "/placeholder.svg"}
                alt={processSteps[activeStep].title}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-gold to-yellow-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
              Step {activeStep + 1}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
