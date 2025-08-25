"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function FindUsSection() {
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

    const element = document.getElementById("find-us-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const platforms = [
    {
      name: "Blinkit",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blinkit-uwnTazIEkj2COaAxfZRraPzvHhblIE.png",
      url: "https://blinkit.com/search?q=poplotus",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Zepto",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zepto-ebivr9Jn1FVrXffptA0kIvI2fIxEkO.png",
      url: "https://zepto.com/search?q=poplotus",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Swiggy Instamart",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/swiggy%20instamart-B0T4uvQYuFTjaCgJRLxE4JEC5s0XN0.png",
      url: "https://www.swiggy.com/instamart/search?query=poplotus",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Amazon",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amazon.jpg-03o3IsvAUzXKUfrph9IHmU9Adws31k.jpeg",
      url: "https://www.amazon.in/s?k=poplotus+makhana",
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "Flipkart",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flipkart.jpg-6TroHNoobGWtiIJUR5oDC031kW1LVf.jpeg",
      url: "https://www.flipkart.com/search?q=poplotus",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  return (
    <section id="find-us-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 mb-4">Find us here</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your favorite PopLotus makhana delivered fresh to your doorstep from these trusted platforms
          </p>
        </div>

        {/* Platform Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className={`transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <a
                href={platform.url}
                className="group block"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Shop PopLotus on ${platform.name}`}
              >
                <div className="relative">
                  {/* Platform Logo Container */}
                  <div className="w-full h-24 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center border border-gray-100 group-hover:border-gold/30 group-hover:-translate-y-2">
                    <Image
                      src={platform.logo || "/placeholder.svg"}
                      alt={`${platform.name} logo`}
                      width={100}
                      height={50}
                      className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>

                  {/* Hover Gradient Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Platform Name */}
                <p className="text-center mt-4 font-medium text-gray-700 group-hover:text-gold transition-colors duration-300">
                  {platform.name}
                </p>
              </a>
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
            <p className="text-xl text-gray-600 mb-6">
              Can't find us on your preferred platform? Let us know and we'll make it happen!
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:contact@poplotus.in?subject=Platform Request&body=Hi PopLotus team, I would like to see your products on..."
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
