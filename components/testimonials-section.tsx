"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const testimonials = [
  {
    id: 1,
    name: "Cheese and Tomato",
    views: "1.1K Views",
    price: "INR 500",
    originalPrice: null,
    discount: null,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Girl+with+Makhana",
    videoUrl: "#",
    productName: "Makhana - Variety Pack",
  },
  {
    id: 2,
    name: "That means a lot to me!",
    views: "819 Views",
    price: "INR 500",
    originalPrice: null,
    discount: null,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Man+with+Product",
    videoUrl: "#",
    productName: "Protein Chips - Variety Pack",
  },
  {
    id: 3,
    name: "It's a good balance",
    views: "435 Views",
    price: "INR 500",
    originalPrice: null,
    discount: null,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Party+Scene",
    videoUrl: "#",
    productName: "Protein Chips - Variety Pack",
  },
  {
    id: 4,
    name: "Healthy Snacking",
    views: "881 Views",
    price: "INR 549",
    originalPrice: "INR 600",
    discount: "9% Off",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Woman+Eating",
    videoUrl: "#",
    productName: "Chocolate Protein Wafer",
  },
  {
    id: 5,
    name: "I tried these SuperYou chips",
    views: "216 Views",
    price: "INR 500",
    originalPrice: null,
    discount: null,
    thumbnail: "/placeholder.svg?height=400&width=300&text=Man+with+Chips",
    videoUrl: "#",
    productName: "Protein Chips - Variety Pack",
  },
  {
    id: 6,
    name: "Choco Peanut Butter Protein",
    views: "955 Views",
    price: "INR 549",
    originalPrice: "INR 600",
    discount: "9% Off",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Man+Eating+Bar",
    videoUrl: "#",
    productName: "Choco Peanut Butter Protein",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from real people who love our premium makhana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden animate-fade-in-up bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={testimonial.thumbnail || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>

                  {/* Views Counter */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      {testimonial.views}
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Share className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-20 left-4 right-4">
                    <h3 className="text-white font-bold text-sm mb-1 drop-shadow-lg">
                      {testimonial.name.toUpperCase()}
                    </h3>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-yellow-500 rounded-sm mr-2 flex-shrink-0"></div>
                    <p className="text-xs text-gray-600 truncate">{testimonial.productName}</p>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-gray-900">{testimonial.price}</span>
                      {testimonial.originalPrice && (
                        <>
                          <span className="text-xs text-gray-500 line-through">{testimonial.originalPrice}</span>
                          <span className="text-xs text-green-600 font-medium">{testimonial.discount}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <Link href="/products">
                    <Button className="w-full bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white text-xs py-2 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <p className="text-gray-600 mb-6">
            Join thousands of happy customers who've made the switch to healthy snacking
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
