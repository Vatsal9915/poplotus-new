"use client"

import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import { Gift, ShoppingCart, X } from "lucide-react"
import { useState } from "react"

// ... existing sampleProducts array with updated images ...
const sampleProducts = [
  {
    id: "sample-peri",
    name: "Peri Peri Sample",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
  },
  {
    id: "sample-cheese",
    name: "Cheese Sample",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
  },
  {
    id: "sample-pudina",
    name: "Pudina Sample",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
  },
  {
    id: "sample-tomato",
    name: "Tomato Chilli Sample",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-e42wl1pg20CJPPZLRzUwLGvYcaigew.png",
  },
  {
    id: "sample-pink-salt",
    name: "Pink Salt Sample",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
  },
  {
    id: "sample-cream-onion",
    name: "Cream & Onion Sample",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
  },
]

export default function CartProgressBar() {
  const { totalPrice, selectedSample, setSelectedSample, items, showCartNotification } = useCart()
  const [showSampleSelector, setShowSampleSelector] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const freeShippingThreshold = 599
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100)
  const remainingAmount = Math.max(freeShippingThreshold - totalPrice, 0)
  const isEligibleForSample = totalPrice >= freeShippingThreshold

  // Filter out samples that are already in cart
  const availableSamples = sampleProducts.filter((sample) => !items.some((item) => item.id === sample.id))

  const handleSampleSelect = (sampleId: string) => {
    setSelectedSample(sampleId)
    showCartNotification("Free sample selected!")
  }

  if (totalPrice === 0 || isHidden) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {isEligibleForSample && (
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsHidden(true)}
              className="w-6 h-6 p-0 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gray-700">Cart Total: ₹{totalPrice}</span>
            </div>
            {isEligibleForSample ? (
              <div className="flex items-center gap-2 text-green-600">
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">Free Sample Unlocked!</span>
              </div>
            ) : (
              <span className="text-sm text-gray-600">Add ₹{remainingAmount} more for free sample</span>
            )}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-gold to-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Sample Selection */}
        {isEligibleForSample && (
          <div className="border-t pt-3">
            {!selectedSample ? (
              <div>
                <p className="text-sm text-gray-700 mb-2">Choose your free sample:</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableSamples.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSampleSelect(sample.id)}
                      className="flex-shrink-0 p-2 border border-gray-200 rounded-lg hover:border-gold transition-colors"
                    >
                      <img
                        src={sample.image || "/placeholder.svg"}
                        alt={sample.name}
                        className="w-12 h-12 object-contain"
                      />
                      <p className="text-xs mt-1 text-center">{sample.name.replace(" Sample", "")}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">
                    Free sample selected:{" "}
                    {sampleProducts.find((s) => s.id === selectedSample)?.name.replace(" Sample", "")}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedSample(null)} className="text-xs">
                  Change
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
