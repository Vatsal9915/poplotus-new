"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function CertificationsStrip() {
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

    const element = document.getElementById("certifications-strip")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const certifications = [
    {
      name: "FDA",
      logo: "/fda.png",
      description: "Food and Drug Administration Approved",
    },
    {
      name: "BRC Food",
      logo: "/brc.png",
      description: "British Retail Consortium Certified",
    },
    {
      name: "GMP Quality",
      logo: "/gmp.png",
      description: "Good Manufacturing Practice",
    },
    {
      name: "FSSAI",
      logo: "/fssai.png",
      description: "Food Safety and Standards Authority of India",
    },
  ]

  return (
    <section id="certifications-strip" className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Certification Logos */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 lg:gap-12 flex-1">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className={`transform transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="group cursor-pointer">
                  <div className="w-24 h-16 md:w-28 md:h-20 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center border border-gray-100 group-hover:border-gold/30">
                    <Image
                      src={cert.logo || "/placeholder.svg"}
                      alt={`${cert.name} Certification`}
                      width={100}
                      height={60}
                      className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div
            className={`lg:max-w-md text-center lg:text-left transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-900 mb-4">our certifications</h3>
            <p className="text-gray-600 leading-relaxed">
              Our products have the highest quality of certifications, because we are maniacal about selling only the
              best.
            </p>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-gold to-amber-600 rounded-full mx-auto lg:mx-0"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
