"use client"

import { useCart } from "./cart-context"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProductSuggestion {
  id: string
  name: string
  price: number
  image: string
  weight: string
  category: "makhana" | "chips" | "cookies" | "chana" | "sample"
}

interface ProductSuggestionsProps {
  cartTotal: number
}

const suggestedProducts: ProductSuggestion[] = [
  {
    id: "cream-onion-40g",
    name: "Cream & Onion Makhana",
    price: 299,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
    weight: "40g",
    category: "makhana",
  },
  {
    id: "pudina-40g",
    name: "Pudina Makhana",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
    weight: "40g",
    category: "makhana",
  },
  {
    id: "chana-jor-garam-200g",
    name: "Chana Jor Garam",
    price: 189,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chana%20jor%20garam-aDnWvXQN3O8BwRKMvQrJM1A9Ykx5Q2.png",
    weight: "200g",
    category: "chana",
  },
]

const freeSampleSuggestions: ProductSuggestion[] = [
  {
    id: "sample-makhana-mix",
    name: "Makhana Mix Sample",
    price: 0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/makhana-mix-sample.png",
    weight: "25g",
    category: "sample",
  },
  {
    id: "sample-chana-jor-garam",
    name: "Chana Jor Garam Sample",
    price: 0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chana-sample.png",
    weight: "30g",
    category: "sample",
  },
  {
    id: "sample-cookies",
    name: "Multigrain Cookies Sample",
    price: 0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cookies-sample.png",
    weight: "25g",
    category: "sample",
  },
]

export function ProductSuggestions({ cartTotal }: ProductSuggestionsProps) {
  const router = useRouter()
  const { addItem } = useCart()

  // Determine what to show based on cart total
  const amountToFreeShipping = Math.max(0, 499 - cartTotal)
  const canGetFreeSample = cartTotal >= 999
  const amountToFreeSample = Math.max(0, 999 - cartTotal)

  const handleContinueShopping = () => {
    router.push("/products")
  }

  const handleAddProduct = (product: ProductSuggestion) => {
    if (product.category === "sample") {
      // For samples, just show a message or add to cart differently
      alert(`${product.name} added as free sample!`)
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        size: product.weight,
        image: product.image,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Free Shipping Section */}
      {amountToFreeShipping > 0 && (
        <Card className="p-4 bg-gold/5 border border-gold/20">
          <p className="text-sm font-medium text-gray-900 mb-4">
            Add ₹{amountToFreeShipping} more to get FREE SHIPPING!
          </p>
          <div className="grid grid-cols-1 gap-3 mb-4">
            {suggestedProducts.slice(0, 2).map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-2 bg-white rounded border border-gray-200">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-600">{product.weight}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gold">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleContinueShopping}
            className="w-full bg-gold hover:bg-gold/90 text-white mb-2"
            size="sm"
          >
            Continue Shopping
          </Button>
        </Card>
      )}

      {/* Free Sample Section */}
      {canGetFreeSample && (
        <Card className="p-4 bg-green-50 border border-green-200">
          <p className="text-sm font-bold text-green-900 mb-4">🎁 You Qualify for a FREE SAMPLE!</p>
          <div className="grid grid-cols-1 gap-3 mb-4">
            {freeSampleSuggestions.map((sample) => (
              <div key={sample.id} className="flex items-center gap-3 p-2 bg-white rounded border border-green-200">
                <Image
                  src={sample.image || "/placeholder.svg"}
                  alt={sample.name}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{sample.name}</p>
                  <p className="text-xs text-green-700 font-semibold">FREE</p>
                </div>
                <Button
                  onClick={() => handleAddProduct(sample)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Continue Shopping Button (if still under threshold) */}
      {!canGetFreeSample && amountToFreeShipping > 0 && (
        <Button
          onClick={handleContinueShopping}
          variant="outline"
          className="w-full border-gold text-gold hover:bg-gold/10 bg-transparent"
        >
          Continue Shopping
        </Button>
      )}
    </div>
  )
}
