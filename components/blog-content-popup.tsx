"use client"

import { X, Clock, User, ChefHat, BookOpen, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface BlogContentPopupProps {
  post: any
  isOpen: boolean
  onClose: () => void
}

export default function BlogContentPopup({ post, isOpen, onClose }: BlogContentPopupProps) {
  if (!isOpen || !post) return null

  const handleShare = async () => {
    // Made function async to await clipboard write
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData) // Await navigator.share
        console.log("Content shared successfully")
      } catch (error) {
        console.error("Error sharing via navigator.share:", error)
        try {
          await navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} ${shareData.url}`)
          alert("Link copied to clipboard!")
          console.log("[v0] Link copied to clipboard as fallback.")
        } catch (clipboardError) {
          console.error("Error copying to clipboard:", clipboardError)
          alert("Failed to share or copy link.")
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} ${shareData.url}`)
        alert("Link copied to clipboard!")
        console.log("Link copied to clipboard (navigator.share not supported).")
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError)
        alert("Failed to copy link to clipboard.")
      }
    }
  }

  const handleShopIngredients = () => {
    alert("Shop Ingredients functionality will be implemented here!")
    // Example: Redirect to a shop page or add items to cart
    // window.location.href = '/products';
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300" onClick={onClose} />

      {/* Popup */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative">
            <Image
              src={post.image || "/placeholder.svg?height=300&width=800"}
              alt={post.title}
              width={800}
              height={300}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${post.type === "recipe" ? "bg-green-500" : "bg-blue-500"} text-white`}>
                  {post.type === "recipe" ? (
                    <ChefHat className="w-3 h-3 mr-1" />
                  ) : (
                    <BookOpen className="w-3 h-3 mr-1" />
                  )}
                  {post.type === "recipe" ? "Recipe" : "Article"}
                </Badge>
                {post.difficulty && (
                  <Badge className="bg-white/90 text-gray-800">
                    <Star className="w-3 h-3 mr-1" />
                    {post.difficulty}
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">{post.title}</h1>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                {post.cookTime && (
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    {post.cookTime}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

            {post.type === "recipe" ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {post.fullIngredients.map((ingredient: string, index: number) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
                  <ol className="space-y-4">
                    {post.fullInstructions.map((instruction: string, index: number) => (
                      <li key={index} className="flex gap-4">
                        <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{post.fullContent}</div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-sm bg-beige/30 text-gray-700 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-500">Published on {post.date}</div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                  onClick={handleShare}
                >
                  {post.type === "recipe" ? "Share Recipe" : "Share Article"}
                </Button>
                {post.type === "recipe" && (
                  <Button className="bg-gold hover:bg-gold/90 text-white" onClick={handleShopIngredients}>
                    Shop Ingredients
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
