"use client"

import { useCart } from "./cart-context"
import { CheckCircle, Gift } from "lucide-react"

export default function CartNotification() {
  const { showNotification, notificationMessage, totalPrice } = useCart()
  const isEligibleForSample = totalPrice >= 599

  if (!showNotification) return null

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">{notificationMessage}</p>
            {isEligibleForSample && (
              <div className="flex items-center gap-1 mt-1">
                <Gift className="w-4 h-4 text-gold" />
                <p className="text-xs text-gold font-medium">Sample unlocked!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
