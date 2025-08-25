"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface Product3DViewProps {
  isOpen: boolean
  onClose: () => void
  product: {
    name: string
    image: string
    backImage?: string
  }
}

export default function Product3DView({ isOpen, onClose, product }: Product3DViewProps) {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

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

  const showBack = Math.abs(rotation % 360) > 90 && Math.abs(rotation % 360) < 270

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-serif font-bold text-gray-900">{product.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-gray-600">Drag to rotate the package</p>
          </div>

          <div
            ref={containerRef}
            className="relative w-full h-96 flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative w-80 h-80 transition-transform duration-100 ease-out"
              style={{
                transform: `rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front side */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${showBack ? "opacity-0" : "opacity-100"}`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} front`}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Back side */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${showBack ? "opacity-100" : "opacity-0"}`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex flex-col items-center justify-center p-8 shadow-2xl">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Nutritional Facts</h4>
                  <div className="text-sm text-gray-700 space-y-2 text-center">
                    <p>
                      <strong>Protein:</strong> 9.7g per 100g
                    </p>
                    <p>
                      <strong>Carbs:</strong> 76.9g per 100g
                    </p>
                    <p>
                      <strong>Fat:</strong> 0.1g per 100g
                    </p>
                    <p>
                      <strong>Fiber:</strong> 14.5g per 100g
                    </p>
                    <p>
                      <strong>Calcium:</strong> 60mg per 100g
                    </p>
                    <p>
                      <strong>Iron:</strong> 1.4mg per 100g
                    </p>
                  </div>
                  <div className="mt-6 text-xs text-gray-600 text-center">
                    <p>✓ Gluten Free ✓ High Protein ✓ Low Fat</p>
                    <p>✓ Natural ✓ No Preservatives</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Rotation: {Math.round(rotation % 360)}°</p>
          </div>
        </div>
      </div>
    </div>
  )
}
