"use client"

import { useEffect, useState } from "react"
import { Heart, X } from "lucide-react"

interface WishlistNotificationProps {
  show: boolean
  productName: string
  onClose: () => void
}

export default function WishlistNotification({ show, productName, onClose }: WishlistNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gold/20 p-4 max-w-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Thanks for loving!</h4>
              <p className="text-sm text-gray-600">{productName} added to wishlist</p>
            </div>
          </div>
          <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
