"use client"

import { X, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "./wishlist-context"
import { useCart } from "./cart-context"
import Link from "next/link"

interface WishlistDropdownProps {
  isOpen: boolean
  onClose: () => void
}

const productData = {
  "cream-onion": {
    name: "Cream & Onion Makhana",
    price: 299,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
    weight: "40g",
  },
  cheese: {
    name: "Cheese Makhana",
    price: 349,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
    weight: "90g",
  },
  "pink-salt": {
    name: "Himalayan Pink Salt Makhana",
    price: 399,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
    weight: "250g",
  },
  "peri-peri": {
    name: "Peri Peri Makhana",
    price: 349,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
    weight: "90g",
  },
  "tomato-chilli": {
    name: "Tomato Chilli Makhana",
    price: 349,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-e42wl1pg20CJPPZLRzUwLGvYcaigew.png",
    weight: "90g",
  },
  pudina: {
    name: "Pudina Makhana",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
    weight: "40g",
  },
  "raw-makhana": {
    name: "Raw Makhana",
    price: 499,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/raw%20makhana-npD1T7NkCGwKO4yOMcJ5vNPkmtKACt.png",
    weight: "250g",
  },
  "sample-box": {
    name: "Discovery Box",
    price: 599,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sample-5F5Y6dW7CHMY7bJ4pXMgbEm41Xh0uY.png",
    weight: "6 flavors",
  },
}

export default function WishlistDropdown({ isOpen, onClose }: WishlistDropdownProps) {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (!isOpen) return null

  const handleAddToCart = (productId: string) => {
    const product = productData[productId as keyof typeof productData]
    if (product) {
      addToCart({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300" onClick={onClose} />

      {/* Wishlist Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-rose-50">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" />
              <h2 className="text-xl font-bold text-gray-900">Your Wishlist</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {wishlist.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-6">Add products you love to keep track of them</p>
                <Link href="/products">
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white"
                  >
                    Browse Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((productId) => {
                  const product = productData[productId as keyof typeof productData]
                  if (!product) return null

                  return (
                    <div
                      key={productId}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.weight}</p>
                        <p className="text-lg font-bold text-gold">₹{product.price}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleAddToCart(productId)}
                          className="px-3 py-2 bg-gradient-to-r from-gold to-amber-600 text-white text-sm rounded-lg hover:shadow-md transition-all duration-200 flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromWishlist(productId)}
                          className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <Link href="/products">
                <Button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
