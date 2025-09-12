"use client"

import { useState } from "react"
import { Calculator, Zap, Heart, Leaf } from "lucide-react"

const productCategories = {
  makhana: {
    name: "Flavored Makhana",
    products: [
      { id: "peri-peri", name: "Peri Peri", caloriesPerGram: 4.2, protein: 9.7, carbs: 76.9, fat: 0.1 },
      { id: "cheese", name: "Cheese", caloriesPerGram: 4.5, protein: 10.2, carbs: 74.5, fat: 1.2 },
      { id: "tomato-chilli", name: "Tomato Chilli", caloriesPerGram: 4.1, protein: 9.5, carbs: 77.2, fat: 0.1 },
      { id: "cream-onion", name: "Cream & Onion", caloriesPerGram: 4.3, protein: 9.8, carbs: 75.8, fat: 0.8 },
      { id: "pink-salt", name: "Himalayan Pink Salt", caloriesPerGram: 3.9, protein: 9.7, carbs: 76.9, fat: 0.1 },
      { id: "pudina", name: "Pudina", caloriesPerGram: 4.0, protein: 9.6, carbs: 77.1, fat: 0.1 },
      { id: "raw", name: "Raw Makhana", caloriesPerGram: 3.5, protein: 9.7, carbs: 76.9, fat: 0.1 },
    ],
  },
  chips: {
    name: "Makhana Chips",
    products: [
      { id: "chips-classic", name: "Classic", caloriesPerGram: 4.8, protein: 12.5, carbs: 68.2, fat: 2.1 },
      { id: "chips-bbq", name: "BBQ", caloriesPerGram: 5.0, protein: 12.8, carbs: 67.5, fat: 2.3 },
      { id: "chips-masala", name: "Masala", caloriesPerGram: 4.9, protein: 12.6, carbs: 67.8, fat: 2.2 },
    ],
  },
  cookies: {
    name: "Makhana Cookies",
    products: [
      { id: "cookies-vanilla", name: "Vanilla", caloriesPerGram: 4.2, protein: 8.5, carbs: 65.3, fat: 3.8 },
      { id: "cookies-chocolate", name: "Chocolate", caloriesPerGram: 4.5, protein: 9.2, carbs: 63.8, fat: 4.2 },
      { id: "cookies-almond", name: "Almond", caloriesPerGram: 4.7, protein: 10.1, carbs: 62.5, fat: 4.8 },
    ],
  },
  {/*chana: {
    name: "Chana Jor Garam",
    products: [
      { id: "chana-classic", name: "Classic", caloriesPerGram: 3.8, protein: 18.2, carbs: 58.5, fat: 1.2 },
      { id: "chana-spicy", name: "Spicy", caloriesPerGram: 3.9, protein: 18.5, carbs: 58.2, fat: 1.3 },
      { id: "chana-tangy", name: "Tangy", caloriesPerGram: 3.8, protein: 18.3, carbs: 58.4, fat: 1.2 },
    ],
  },*/}
}

export default function CalorieCalculator() {
  const [selectedCategory, setSelectedCategory] = useState("makhana")
  const [selectedProduct, setSelectedProduct] = useState(productCategories.makhana.products[0])
  const [servingSize, setServingSize] = useState(25) // grams

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedProduct(productCategories[category as keyof typeof productCategories].products[0])
  }

  const totalCalories = Math.round(selectedProduct.caloriesPerGram * servingSize)
  const totalProtein = Math.round(((selectedProduct.protein * servingSize) / 100) * 10) / 10
  const totalCarbs = Math.round(((selectedProduct.carbs * servingSize) / 100) * 10) / 10
  const totalFat = Math.round(((selectedProduct.fat * servingSize) / 100) * 10) / 10

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Calorie Calculator</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate the nutritional value of your PopLotus snacks
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Product Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                >
                  {Object.entries(productCategories).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Flavor</label>
                <select
                  value={selectedProduct.id}
                  onChange={(e) => {
                    const product = productCategories[selectedCategory as keyof typeof productCategories].products.find(
                      (p) => p.id === e.target.value,
                    )
                    if (product) setSelectedProduct(product)
                  }}
                  className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                >
                  {productCategories[selectedCategory as keyof typeof productCategories].products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Serving Size: {servingSize}g</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={servingSize}
                  onChange={(e) => setServingSize(Number(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10g</span>
                  <span>100g</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Total Calories</span>
                </div>
                <div className="text-3xl font-bold">{totalCalories} kcal</div>
              </div>
            </div>

            {/* Nutritional Breakdown */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nutritional Breakdown</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">Protein</span>
                  </div>
                  <span className="font-bold text-green-600">{totalProtein}g</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-700">Carbohydrates</span>
                  </div>
                  <span className="font-bold text-blue-600">{totalCarbs}g</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-700">Fat</span>
                  </div>
                  <span className="font-bold text-purple-600">{totalFat}g</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Values are approximate and may vary slightly based on processing and natural
                  variations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
