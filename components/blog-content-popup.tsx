"use client"

import { X, Clock, User, ChefHat, BookOpen, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface BlogContentPopupProps {
  post: any
  isOpen: boolean
  onClose: () => void
}

function normalizeMd(input: string): string {
  if (!input) return ""
  // Replace tabs with two spaces to simplify indentation handling
  const lines = String(input).replace(/\t/g, "  ").split("\n")
  const indents = lines
    .filter((l) => l.trim().length > 0)
    .map((l) => (l.match(/^ +/) ? (l.match(/^ +/) as RegExpMatchArray)[0].length : 0))
  const min = indents.length ? Math.min(...indents) : 0
  const out = lines
    .map((l) => (min ? l.slice(Math.min(min, l.length)) : l))
    .join("\n")
    .trim()
  return out
}

export default function BlogContentPopup({ post, isOpen, onClose }: BlogContentPopupProps) {
  if (!isOpen || !post) return null

  const handleShare = async () => {
    const url = new URL(window.location.href)
    url.searchParams.set("post", String(post.id))
    const shareUrl = url.toString()

    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: shareUrl,
    }

    // Prefer Web Share when available, else fallback to clipboard
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        console.log("Shared via Web Share:", shareUrl)
        return
      } catch (err) {
        console.warn("navigator.share failed, falling back to clipboard:", (err as Error)?.message)
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      alert("Link copied to clipboard!")
      console.log("Copied URL to clipboard:", shareUrl)
    } catch (clipboardError) {
      console.error("Clipboard copy failed:", clipboardError)
      alert("Unable to share or copy link.")
    }
  }

  const handleShopIngredients = () => {
    alert("Shop Ingredients functionality will be implemented here!")
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
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }) => <span {...props} className="text-gold-700" />,
                            strong: ({ node, ...props }) => (
                              <strong className="font-semibold text-gold-900" {...props} />
                            ),
                          }}
                        >
                          {normalizeMd(ingredient)}
                        </ReactMarkdown>
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
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }) => <p className="text-gold-700 leading-relaxed pt-1" {...props} />,
                            strong: ({ node, ...props }) => (
                              <strong className="font-semibold text-gold-900" {...props} />
                            ),
                          }}
                        >
                          {normalizeMd(instruction)}
                        </ReactMarkdown>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="max-w-none font-sans">
                <div className="markdown-article">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-3xl font-semibold text-gray-900 mb-4" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl font-semibold text-gray-900 mb-2" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                      em: ({ node, ...props }) => <em className="italic" {...props} />,
                      a: ({ node, ...props }) => <a className="text-gold hover:underline" {...props} />,
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-6 marker:text-gold text-gray-700 space-y-2" {...props} />
                      ),
                      li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-6 marker:text-gold text-gray-700 space-y-2" {...props} />
                      ),
                    }}
                  >
                    {normalizeMd(post.fullContent)}
                  </ReactMarkdown>
                </div>
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
