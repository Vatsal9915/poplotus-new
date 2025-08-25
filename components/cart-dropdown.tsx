"use client"

import { useCart } from "./cart-context"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"

const sampleProducts = [
  {
    id: "sample-peri-peri",
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
    id: "sample-pink-salt",
    name: "Pink Salt Sample",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
  },
  {
    id: "sample-tomato-chilli",
    name: "Tomato Chilli Sample",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-qMZ2ZsZOUGPqwq0C47V50pZxQVZjqq.png",
  },
  {
    id: "sample-cream-onion",
    name: "Cream & Onion Sample",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
  },
]

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, updateQuantity, totalPrice, selectedSample, setSelectedSample } = useCart()

  if (!isOpen) return null

  const progress = Math.min((totalPrice / 599) * 100, 100)
  const remainingAmount = Math.max(599 - totalPrice, 0)
  const canSelectSample = totalPrice >= 599

  const availableSamples = sampleProducts.filter(
    (sample) => !items.some((item) => item.name.toLowerCase().includes(sample.name.toLowerCase().split(" ")[0])),
  )

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif text-gray-900">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-contain" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.size}</p>
                      <p className="text-sm font-medium text-[#D4AF37]">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-6 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {canSelectSample ? "Free Sample Unlocked!" : `₹${remainingAmount} more for free sample`}
                  </span>
                  <span className="text-sm text-[#D4AF37]">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Sample Selection */}
              {canSelectSample && availableSamples.length > 0 && (
                <div className="mb-6 p-4 border-2 border-[#D4AF37] rounded-lg bg-[#D4AF37]/5">
                  <h3 className="font-medium text-gray-900 mb-3">Choose Your Free Sample:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSamples.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => setSelectedSample(sample.name)}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          selectedSample === sample.name
                            ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "border-gray-200 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <img
                          src={sample.image || "/placeholder.svg"}
                          alt={sample.name}
                          className="w-8 h-8 mx-auto mb-1 object-contain"
                        />
                        {sample.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total: ₹{totalPrice}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
