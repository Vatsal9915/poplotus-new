"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Plus, Minus, ShoppingCart, Check } from "lucide-react"
import { useCart } from "./cart-context"

const availableProducts = [
  {
    id: "cream-onion",
    name: "Cream & Onion",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
    price: 299,
    weight: "40g",
  },
  {
    id: "cheese",
    name: "Cheese",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
    price: 329,
    weight: "90g",
  },
  {
    id: "pink-salt",
    name: "Himalayan Pink Salt",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
    price: 349,
    weight: "250g",
  },
  {
    id: "peri-peri",
    name: "Peri Peri",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
    price: 329,
    weight: "90g",
  },
  {
    id: "tomato-chilli",
    name: "Tomato Chilli",
    image: "/tomato-chilli.png",
    price: 319,
    weight: "90g",
  },
  {
    id: "chocolate-coated",
    name: "Chocolate Coated",
    image: "/chocolate-coated-makhana.png",
    price: 399,
    weight: "80g",
  },
]

export default function BuildYourOwnBox() {
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: number }>({})
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const updateQuantity = (productId: string, change: number) => {
    setSelectedProducts((prev) => {
      const newQuantity = (prev[productId] || 0) + change
      if (newQuantity <= 0) {
        const { [productId]: removed, ...rest } = prev
        return rest
      }
      return { ...prev, [productId]: Math.min(newQuantity, 5) }
    })
  }

  const getTotalPrice = () => {
    return Object.entries(selectedProducts).reduce((total, [productId, quantity]) => {
      const product = availableProducts.find((p) => p.id === productId)
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  const getTotalItems = () => {
    return Object.values(selectedProducts).reduce((total, quantity) => total + quantity, 0)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)

    try {
      const boxItems = Object.entries(selectedProducts)
        .map(([productId, quantity]) => {
          const product = availableProducts.find((p) => p.id === productId)
          return product ? { ...product, quantity } : null
        })
        .filter(Boolean)

      if (boxItems.length > 0) {
        addItem({
          id: `custom-box-${Date.now()}`,
          name: `Custom Makhana Box (${getTotalItems()} items)`,
          price: getTotalPrice(),
          image: boxItems[0]?.image || "/placeholder.svg",
          size: `${getTotalItems()} items`,
        })

        setAddedToCart(true)
        setSelectedProducts({})

        setTimeout(() => {
          setAddedToCart(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Error adding box to cart:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <section id="build-your-own-box" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Build Your Own Box</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your perfect snack combination! Mix and match your favorite flavors to build a personalized box that
            suits your taste.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-6">Choose Your Flavors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableProducts.map((product) => (
                <Card key={product.id} className="border-2 hover:border-gold transition-colors duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.weight}</p>
                        <p className="font-bold text-gold">₹{product.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(product.id, -1)}
                          disabled={!selectedProducts[product.id]}
                          className="w-8 h-8 p-0 border-gold text-gold hover:bg-gold hover:text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{selectedProducts[product.id] || 0}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(product.id, 1)}
                          disabled={(selectedProducts[product.id] || 0) >= 5}
                          className="w-8 h-8 p-0 border-gold text-gold hover:bg-gold hover:text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Box Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-gold/20 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-6">Your Custom Box</h3>

                {getTotalItems() === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Start adding products to build your box</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {Object.entries(selectedProducts).map(([productId, quantity]) => {
                        const product = availableProducts.find((p) => p.id === productId)
                        if (!product) return null
                        return (
                          <div
                            key={productId}
                            className="flex justify-between items-center py-2 border-b border-gray-100"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">Qty: {quantity}</p>
                            </div>
                            <p className="font-semibold text-gold">₹{product.price * quantity}</p>
                          </div>
                        )
                      })}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Total Items:</span>
                        <span className="font-semibold">{getTotalItems()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                        <span className="text-2xl font-bold text-gold">₹{getTotalPrice()}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || getTotalItems() === 0}
                      className={`w-full py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                        addedToCart
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gold hover:bg-gold/90 text-white"
                      }`}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Adding to Cart...
                        </>
                      ) : addedToCart ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add Box to Cart
                        </>
                      )}
                    </Button>

                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700 text-center">
                        <Badge className="bg-green-100 text-green-800 mr-2">Free Shipping</Badge>
                        on orders above ₹500
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
