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

  const recipeContent = {
    ingredients: [
      "1 cup PopLotus Raw Makhana",
      "4 cups whole milk",
      "1/2 cup sugar (adjust to taste)",
      "1/4 cup chopped almonds",
      "1/4 cup chopped pistachios",
      "1/2 tsp cardamom powder",
      "A pinch of saffron",
      "2 tbsp ghee",
    ],
    instructions: [
      "Heat ghee in a heavy-bottomed pan and roast the makhana until crispy. Set aside.",
      "In the same pan, bring milk to a boil and simmer for 10 minutes.",
      "Add the roasted makhana to the milk and cook for 15 minutes until soft.",
      "Add sugar, cardamom powder, and saffron. Mix well.",
      "Garnish with chopped nuts and serve hot or chilled.",
      "Optional: Blend half the mixture for a creamier texture.",
    ],
  }

  const articleContent = `
    Makhana, also known as foxnuts or lotus seeds, has been treasured in Indian cuisine and Ayurveda for centuries. These white, puffy seeds are not just delicious but pack an incredible nutritional punch that makes them a true superfood.

    **Rich in Protein and Low in Calories**
    
    One of the most remarkable aspects of makhana is its high protein content. A 100g serving contains approximately 9.7g of protein while being incredibly low in calories (only 347 calories per 100g). This makes it an excellent snack for weight management and muscle building.

    **Packed with Essential Minerals**
    
    Makhana is rich in calcium, magnesium, iron, and phosphorus. The calcium content is particularly impressive, making it beneficial for bone health. The magnesium helps in maintaining heart health and regulating blood pressure.

    **Antioxidant Properties**
    
    These lotus seeds contain flavonoids and other antioxidants that help fight free radicals in the body, potentially reducing the risk of chronic diseases and supporting overall health.

    **Digestive Health Benefits**
    
    The fiber content in makhana aids digestion and helps maintain gut health. It's also easy to digest, making it suitable for people with sensitive stomachs.

    **Heart Health Support**
    
    The low sodium and high potassium content makes makhana heart-friendly. Regular consumption may help in maintaining healthy blood pressure levels.
  `

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
                    {recipeContent.ingredients.map((ingredient, index) => (
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
                    {recipeContent.instructions.map((instruction, index) => (
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
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{articleContent}</div>
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
                >
                  Share Recipe
                </Button>
                <Button className="bg-gold hover:bg-gold/90 text-white">Shop Ingredients</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
