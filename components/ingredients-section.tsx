import { Leaf, Shield, Award, Heart, Zap, CheckCircle } from "lucide-react"

const ingredients = [
  {
    name: "Premium Makhana (Fox Nuts)",
    description: "Naturally popped lotus seeds sourced from the pristine wetlands of Bihar",
    benefits: ["High in protein", "Low in calories", "Rich in antioxidants", "Gluten-free"],
    icon: Leaf,
  },
  {
    name: "Natural Seasonings",
    description: "Carefully selected spices and herbs for authentic flavors",
    benefits: ["No artificial colors", "No preservatives", "Traditional recipes", "Pure ingredients"],
    icon: Award,
  },
  {
    name: "Himalayan Pink Salt",
    description: "Unrefined salt rich in minerals for enhanced taste and health",
    benefits: ["84 trace minerals", "Lower sodium", "Natural electrolytes", "Pure & unprocessed"],
    icon: Shield,
  },
]

const nutritionalHighlights = [
  { label: "High Protein", value: "9.7g per 100g", icon: Heart, color: "text-red-600 bg-red-50" },
  { label: "Low Fat", value: "< 1g per 100g", icon: Zap, color: "text-green-600 bg-green-50" },
  { label: "Gluten Free", value: "100% Natural", icon: CheckCircle, color: "text-blue-600 bg-blue-50" },
  { label: "Low Calories", value: "347 kcal/100g", icon: Leaf, color: "text-purple-600 bg-purple-50" },
]

export default function IngredientsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Know Your Ingredients</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparency in every bite - discover what makes our makhana special
          </p>
        </div>

        {/* Nutritional Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {nutritionalHighlights.map((highlight, index) => {
            const IconComponent = highlight.icon
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-full ${highlight.color} flex items-center justify-center mx-auto mb-3`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{highlight.label}</h3>
                <p className="text-sm text-gray-600">{highlight.value}</p>
              </div>
            )
          })}
        </div>

        {/* Ingredients Details */}
        <div className="space-y-8">
          {ingredients.map((ingredient, index) => {
            const IconComponent = ingredient.icon
            return (
              <div key={index} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{ingredient.name}</h3>
                    <p className="text-gray-700 mb-4 text-lg">{ingredient.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {ingredient.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2 bg-white/70 rounded-lg p-3">
                          <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quality Assurance */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white text-center">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-4">Quality Assurance</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            Every batch of PopLotus makhana undergoes rigorous quality checks to ensure you get the finest, most
            nutritious snacks. From sourcing to packaging, we maintain the highest standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">FSSAI Certified</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">ISO 22000</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">HACCP Compliant</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">100% Vegetarian</span>
          </div>
        </div>
      </div>
    </section>
  )
}
