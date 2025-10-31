"use client"

import { useMemo } from "react"

interface ShippingProgressProps {
  cartTotal: number
}

export function ShippingProgress({ cartTotal }: ShippingProgressProps) {
  const freeShippingThreshold = 499
  const freeSampleThreshold = 999

  const progress = useMemo(() => {
    const percentage = Math.min((cartTotal / freeShippingThreshold) * 100, 100)
    const amountNeeded = Math.max(freeShippingThreshold - cartTotal, 0)
    const hasFreeSample = cartTotal >= freeSampleThreshold
    const hasShipping = cartTotal >= freeShippingThreshold

    return { percentage, amountNeeded, hasFreeSample, hasShipping }
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
      <p className="text-gray-700 text-sm font-medium mb-3">
        {progress.hasShipping
          ? `Add ₹${freeSampleThreshold - cartTotal} more to get a Free Sample!`
          : `Add ₹${progress.amountNeeded} more to get Free Shipping on this order`}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-gold h-full rounded-full transition-all duration-300"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* Milestone Indicators */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${progress.hasShipping ? "bg-gold" : "bg-gray-300"}`} />
          <span className={progress.hasShipping ? "text-gold font-medium" : "text-gray-600"}>Free Shipping!</span>
        </div>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${progress.hasFreeSample ? "bg-gold" : "bg-gray-300"}`} />
          <span className={progress.hasFreeSample ? "text-gold font-medium" : "text-gray-600"}>Free Sample</span>
        </div>
      </div>
    </div>
  )
}
