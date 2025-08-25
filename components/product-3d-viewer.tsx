"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Product3DViewerProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

export default function Product3DViewer({ product, isOpen, onClose }: Product3DViewerProps) {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - startX
    setRotation((prev) => prev + deltaX * 0.5)
    setStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetRotation = () => {
    setRotation(0)
  }

  if (!isOpen || !product) return null

  const showBackside = Math.abs(rotation % 360) > 90 && Math.abs(rotation % 360) < 270

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600">360° Product View</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={resetRotation}
              variant="outline"
              size="sm"
              className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">
              {showBackside ? "Back View - Nutritional Information" : "Front View - Product Details"}
            </p>
            <p className="text-xs text-gray-500">Drag to rotate • Scroll to zoom</p>
          </div>

          <div
            ref={containerRef}
            className="relative w-full h-96 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative transition-transform duration-100 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front side */}
              <div
                className={`absolute inset-0 backface-hidden ${showBackside ? "opacity-0" : "opacity-100"}`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} - Front`}
                  width={300}
                  height={400}
                  className="w-auto h-80 object-contain drop-shadow-2xl"
                  draggable={false}
                />
              </div>

              {/* Back side */}
              <div
                className={`absolute inset-0 ${showBackside ? "opacity-100" : "opacity-0"}`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-80 h-80 bg-gradient-to-br from-beige/20 to-gold/10 rounded-2xl border-2 border-gold/20 p-6 flex flex-col justify-center items-center shadow-2xl">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Nutritional Information</h3>
                  <div className="space-y-2 text-sm text-gray-700 w-full">
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Energy</span>
                      <span className="font-medium">347 kcal</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Protein</span>
                      <span className="font-medium">9.7g</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Carbohydrates</span>
                      <span className="font-medium">76.9g</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Fat</span>
                      <span className="font-medium">0.1g</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>Fiber</span>
                      <span className="font-medium">14.5g</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-600">*Per 100g serving</p>
                    <div className="flex gap-2 mt-2">
                      {product.nutritionHighlights?.map((highlight: string) => (
                        <span key={highlight} className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="font-bold text-2xl text-gold">₹{product.price}</span>
              <span className="text-gray-600">{product.weight}</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
