"use client"

import { useMemo } from "react"

interface ShippingProgressProps {
  cartTotal: number
}

export function ShippingProgress({ cartTotal }: ShippingProgressProps) {
  const freeShippingThreshold = 499
  const freeSampleThreshold = 999

  const progress = useMemo(() => {
    let stageProgress = 0
    let message = ""

    if (cartTotal >= freeSampleThreshold) {
      stageProgress = 100
      message = "You have unlocked all benefits!"
    } else if (cartTotal >= freeShippingThreshold) {
      // Between ₹499 and ₹999 - calculate progress to second milestone
      stageProgress = ((cartTotal - freeShippingThreshold) / (freeSampleThreshold - freeShippingThreshold)) * 100
      message = `Add ₹${freeSampleThreshold - cartTotal} more to get a Free Sample!`
    } else {
      // Below ₹499 - calculate progress to first milestone
      stageProgress = (cartTotal / freeShippingThreshold) * 100
      message = `Add ₹${freeShippingThreshold - cartTotal} more to get Free Shipping on this order`
    }

    return {
      stageProgress: Math.min(stageProgress, 100),
      message,
      hasFreeSample: cartTotal >= freeSampleThreshold,
      hasShipping: cartTotal >= freeShippingThreshold,
    }
  }, [cartTotal])

  if (cartTotal >= freeSampleThreshold) {
    return (
      <div className="bg-gradient-to-r from-gold/10 to-green-50 border border-gold/20 rounded-lg p-4 mb-6">
        <p className="text-green-700 font-medium text-sm mb-3">You have unlocked all benefits!</p>
        <div className="space-y-2 text-xs text-green-600">
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-600 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">
              ✓
            </span>
            Free Shipping on this order
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-green-600 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">
              ✓
            </span>
            Free Sample included
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <p className="text-gray-700 text-sm font-medium mb-3">{progress.message}</p>

      {/* Progress Bar with two checkpoints */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="bg-gold h-full rounded-full transition-all duration-300"
          style={{ width: `${progress.stageProgress}%` }}
        />
      </div>

      {/* Milestone Indicators */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${progress.hasShipping ? "bg-gold" : "bg-gray-300"}`} />
          <span className={progress.hasShipping ? "text-gold font-medium" : "text-gray-600"}>₹499: Free Shipping</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${progress.hasFreeSample ? "bg-gold" : "bg-gray-300"}`} />
          <span className={progress.hasFreeSample ? "text-gold font-medium" : "text-gray-600"}>₹999: Free Sample</span>
        </div>
      </div>
    </div>
  )
}
