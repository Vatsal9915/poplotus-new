"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Award, Leaf } from "lucide-react"
import { useCart } from "./cart-context"

interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  weight: string
  tags: string[]
  nutritionHighlights: string[]
}

interface ProductDetailsPopupProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const nutritionalFacts = {
  "Per 100g": {
    Energy: "347 kcal",
    Protein: "9.7g",
    Carbohydrates: "76.9g",
    Fat: "0.1g",
    Fiber: "14.5g",
    Sodium: "1mg",
  },
}

const healthBenefits = [
  { icon: <Heart className="w-5 h-5" />, title: "Heart Healthy", desc: "Low in sodium and cholesterol-free" },
  { icon: <Award className="w-5 h-5" />, title: "High Protein", desc: "Essential amino acids for muscle health" },
  { icon: <Leaf className="w-5 h-5" />, title: "Natural & Pure", desc: "No artificial preservatives or colors" },
  { icon: <Star className="w-5 h-5" />, title: "Gluten Free", desc: "Perfect for gluten-sensitive individuals" },
]

export default function ProductDetailsPopup({ product, isOpen, onClose }: ProductDetailsPopupProps) {
  const { addItem } = useCart()

  if (!product) return null

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.weight,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-gray-900">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-80 object-contain rounded-lg bg-gradient-to-br from-beige/20 to-beige/40"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} className="bg-gold text-white text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Package Back View */}
            <div className="bg-gradient-to-br from-beige/10 to-beige/30 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Nutritional Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(nutritionalFacts["Per 100g"]).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gold">₹{product.price}</p>
                  <p className="text-gray-500">{product.weight}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8/5)</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Nutrition Highlights */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {product.nutritionHighlights.map((highlight) => (
                    <span key={highlight} className="bg-beige/30 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Health Benefits */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Health Benefits</h4>
              <div className="grid grid-cols-1 gap-3">
                {healthBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-beige/10 rounded-lg">
                    <div className="text-gold mt-0.5">{benefit.icon}</div>
                    <div>
                      <h5 className="font-medium text-gray-900">{benefit.title}</h5>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-gold/10 to-yellow-100 p-4 rounded-lg border border-gold/20">
              <h4 className="font-semibold text-gray-900 mb-2">Why Choose PopLotus?</h4>
              <p className="text-sm text-gray-700">
                🌟 <strong>Premium Quality:</strong> Sourced from the finest lotus seeds
                <br />🌱 <strong>Healthy Choice:</strong> Low fat, high protein, gluten-free
                <br />💚 <strong>Natural Goodness:</strong> No artificial preservatives or colors
                <br />🎯 <strong>Perfect Snack:</strong> Ideal for guilt-free munching anytime
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button onClick={handleAddToCart} className="flex-1 bg-gold hover:bg-gold/90 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
