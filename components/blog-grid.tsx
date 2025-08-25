"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Clock, User, ChefHat, BookOpen } from "lucide-react"
import { useState } from "react"
import BlogFilters from "./blog-filters"
import BlogContentPopup from "./blog-content-popup"

const blogPosts = [
  {
    id: 1,
    type: "recipe",
    title: "Creamy Makhana Kheer",
    excerpt: "Transform your PopLotus makhana into a rich, creamy dessert that's both indulgent and nutritious.",
    image: "/makhana-kheer.png",
    author: "Chef Priya",
    readTime: "15 min",
    cookTime: "30 min",
    difficulty: "Easy",
    tags: ["Dessert", "Traditional", "Healthy"],
    date: "March 15, 2025",
  },
  {
    id: 2,
    type: "article",
    title: "5 Health Benefits of Makhana You Didn't Know",
    excerpt: "Discover the amazing nutritional properties of foxnuts and why they should be part of your daily diet.",
    image: "/makhana-benefits.png",
    author: "Dr. Anjali Sharma",
    readTime: "8 min",
    tags: ["Health", "Nutrition", "Wellness"],
    date: "March 12, 2025",
  },
  {
    id: 3,
    type: "recipe",
    title: "Spicy Makhana Chaat",
    excerpt: "A delicious street-food inspired recipe that combines the crunch of makhana with tangy chutneys.",
    image: "/salted-makhana.png",
    author: "Chef Rajesh",
    readTime: "10 min",
    cookTime: "20 min",
    difficulty: "Medium",
    tags: ["Snack", "Street Food", "Spicy"],
    date: "March 10, 2025",
  },
  {
    id: 4,
    type: "article",
    title: "The Ancient Superfood: History of Makhana",
    excerpt: "Journey through time to discover how lotus seeds became one of India's most cherished healthy snacks.",
    image: "/makhana-history.png",
    author: "Historian Maya Patel",
    readTime: "12 min",
    tags: ["History", "Culture", "Traditional"],
    date: "March 8, 2025",
  },
  {
    id: 5,
    type: "recipe",
    title: "Chocolate Makhana Energy Balls",
    excerpt: "No-bake energy balls that combine the goodness of makhana with rich chocolate flavor.",
    image: "/chocolate-makhana.png",
    author: "Nutritionist Kavya",
    readTime: "5 min",
    cookTime: "15 min",
    difficulty: "Easy",
    tags: ["Energy", "No-Bake", "Healthy"],
    date: "March 5, 2025",
  },
  {
    id: 6,
    type: "article",
    title: "Sustainable Snacking: Our Environmental Commitment",
    excerpt: "Learn about PopLotus's journey towards sustainable packaging and eco-friendly practices.",
    image: "/sustainability.png",
    author: "Sustainability Team",
    readTime: "6 min",
    tags: ["Sustainability", "Environment", "Corporate"],
    date: "March 3, 2025",
  },
]

export default function BlogGrid() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const filteredPosts = blogPosts.filter((post) => {
    if (activeFilter === "all") return true
    if (activeFilter === "recipes") return post.type === "recipe"
    if (activeFilter === "articles") return post.type === "article"
    return false
  })

  const handlePostClick = (post: any) => {
    setSelectedPost(post)
    setIsPopupOpen(true)
  }

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg?height=250&width=400"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Post type badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`${
                          post.type === "recipe" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                        } flex items-center gap-1 backdrop-blur-sm`}
                      >
                        {post.type === "recipe" ? <ChefHat className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                        {post.type === "recipe" ? "Recipe" : "Article"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                      {post.type === "recipe" && post.cookTime && (
                        <div className="flex items-center gap-1">
                          <ChefHat className="w-4 h-4" />
                          {post.cookTime}
                        </div>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-beige/30 text-gray-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {post.type === "recipe" && post.difficulty && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-600">Difficulty: </span>
                        <span
                          className={`text-sm font-medium ${
                            post.difficulty === "Easy"
                              ? "text-green-600"
                              : post.difficulty === "Medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {post.difficulty}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <Button onClick={() => handlePostClick(post)} className="bg-gold hover:bg-gold/90 text-white">
                        {post.type === "recipe" ? "View Recipe" : "Read Article"}
                      </Button>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="text-center mt-16 bg-beige/20 rounded-2xl p-12">
            <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">Never Miss a Recipe!</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest recipes, health tips, and exclusive content delivered to
              your inbox.
            </p>
            <Button className="bg-gold hover:bg-gold/90 text-white px-8 py-3 text-lg">Subscribe Now</Button>
          </div>
        </div>
      </section>

      {/* Blog content popup */}
      <BlogContentPopup post={selectedPost} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  )
}
