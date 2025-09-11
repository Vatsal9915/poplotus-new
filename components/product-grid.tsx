"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState } from "react"
import ProductDetailsPopup from "./product-details-popup"
import Link from "next/link"

const products = [
  {
    id: "cream-onion",
    name: "Cream & Onion Makhana",
    description: "Creamy and savory blend with the perfect hint of onion",
    image:
      "/creamnonion.webp",
    price: 299,
    weight: "40g",
    tags: ["New"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
  {
    id: "cheese",
    name: "Cheese Makhana",
    description: "Rich, cheesy goodness that melts in your mouth",
    image: "/cheese.webp",
    price: 329,
    weight: "90g",
    tags: ["Bestseller"],
    nutritionHighlights: ["High Protein", "Low Fat", "Gluten Free"],
  },
  {
    id: "pink-salt",
    name: "Himalayan Pink Salt",
    description: "Pure makhana with premium Himalayan pink salt",
    image: "/pink-salt.webp",
    price: 349,
    weight: "250g",
    tags: ["Premium"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
  {
    id: "peri-peri",
    name: "Peri Peri Makhana",
    description: "Fiery peri peri spices for those who love heat",
    image: "/peri.webp",
    price: 329,
    weight: "90g",
    tags: ["Spicy"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
  },
]

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleQuickView = (product: any) => {
    setSelectedProduct(product)
    setIsPopupOpen(true)
  }

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carefully crafted varieties to satisfy every craving while keeping your health in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                      <Badge className="bg-gold text-white text-xs shadow-lg backdrop-blur-sm">{product.tags[0]}</Badge>
                    </div>

                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-300" />
                  </div>
                  <div className="p-6 flex flex-col h-64">
                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow min-h-[3rem]">
                      {product.description}
                    </p>

                    <div className="flex flex-col gap-3 mt-auto">
                      <Button
                        onClick={() => handleQuickView(product)}
                        variant="outline"
                        className="w-full h-11 border-gold text-gold hover:bg-gold hover:text-white transform hover:scale-105 transition-all duration-300 font-medium"
                      >
                        Quick View
                      </Button>
                      <Link href="/products">
                        <Button className="w-full h-11 bg-gold hover:bg-gold/90 text-white transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg font-medium">
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">Want to try them all?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get our Flavor Discovery Box with samples of all six premium varieties. Perfect for finding your favorite
              or sharing with friends.
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Shop Discovery Box
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ProductDetailsPopup product={selectedProduct} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  )
}
