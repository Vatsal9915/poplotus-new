"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup")
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem("hasSeenWelcomePopup", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-3xl rounded-2xl bg-white p-10 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 sm:p-12 lg:p-16">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Header with gradient */}
          <div className="mb-6 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
            <h2 className="text-3xl font-bold text-amber-800 mb-3">Welcome to PopLotus 🌸</h2>
            <p className="text-amber-700 text-lg">We're super excited to have you here!</p>
          </div>

          {/* Main message */}
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            <p>Our kitchen is still buzzing, and we're putting the final touches on your favorite healthy snacks. 🚀</p>
            <p>👉 We're in our pre-launch phase, giving you a first look at what's cooking. 🍿✨</p>
            <p>The crunchy goodness will be served very soon, and you'll be the first to know when we go live! 💛</p>
            <p className="font-semibold text-amber-700">Stay tuned — something delicious is on its way! ✨</p>
          </div>

          {/* CTA button */}
          <button
            onClick={handleClose}
            className="mt-8 w-full sm:w-auto rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-amber-500 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105"
          >
            Let's Explore! 🎉
          </button>
        </div>
      </div>
    </div>
  )
}
