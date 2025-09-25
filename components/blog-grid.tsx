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
    date: "March 15, 2024",
    fullIngredients: [
      "**1 cup** PopLotus Raw Makhana",
      "**4 cups** whole milk",
      "**1/2 cup** sugar (adjust to taste)",
      "**1/4 cup** chopped almonds",
      "**1/4 cup** chopped pistachios",
      "**1/2 tsp** cardamom powder",
      "A pinch of saffron",
      "**2 tbsp** ghee",
    ],
    fullInstructions: [
      "Heat ghee in a heavy-bottomed pan and roast the makhana until crispy. Set aside.",
      "In the same pan, bring milk to a boil and simmer for 10 minutes.",
      "Add the roasted makhana to the milk and cook for 15 minutes until soft.",
      "Add sugar, cardamom powder, and saffron. Mix well.",
      "Garnish with chopped nuts and serve hot or chilled.",
      "**Optional:** Blend half the mixture for a creamier texture.",
    ],
  },
  {
    id: 2,
    type: "article",
    title: "5 Health Benefits of Makhana You Didn't Know",
    excerpt: "Discover the amazing nutritional properties of foxnuts and why they should be part of your daily diet.",
    image: "/health-benefits-makhana.png",
    author: "Dr. Anjali Sharma",
    readTime: "8 min",
    tags: ["Health", "Nutrition", "Wellness"],
    date: "March 12, 2024",
    fullContent: `
      Makhana, also known as foxnuts or lotus seeds, has been treasured in Indian cuisine and Ayurveda for centuries. These white, puffy seeds are not just delicious but pack an incredible nutritional punch that makes them a true superfood.

      ### Rich in Protein and Low in Calories
      
      One of the most remarkable aspects of makhana is its high protein content. A 100g serving contains approximately **9.7g of protein** while being incredibly low in calories (only 347 calories per 100g). This makes it an excellent snack for weight management and muscle building.

      ### Packed with Essential Minerals
      
      Makhana is rich in calcium, magnesium, iron, and phosphorus. The calcium content is particularly impressive, making it beneficial for bone health. The magnesium helps in maintaining heart health and regulating blood pressure.

      ### Antioxidant Properties
      
      These lotus seeds contain flavonoids and other antioxidants that help fight free radicals in the body, potentially reducing the risk of chronic diseases and supporting overall health.

      ### Digestive Health Benefits
      
      The fiber content in makhana aids digestion and helps maintain gut health. It's also easy to digest, making it suitable for people with sensitive stomachs.

      ### Heart Health Support
      
      The low sodium and high potassium content makes makhana heart-friendly. Regular consumption may help in maintaining healthy blood pressure levels.

      **Key Takeaways:**
      *   Excellent source of plant-based protein.
      *   Rich in essential minerals like calcium and magnesium.
      *   Contains beneficial antioxidants.
      *   Supports digestive and heart health.
      *   A versatile and healthy snack option.
    `,
  },
  {
    id: 3,
    type: "recipe",
    title: "Spicy Makhana Chaat",
    excerpt: "A delicious street-food inspired recipe that combines the crunch of makhana with tangy chutneys.",
    image: "/makhana-chaat.png",
    author: "Chef Rajesh",
    readTime: "10 min",
    cookTime: "20 min",
    difficulty: "Medium",
    tags: ["Snack", "Street Food", "Spicy"],
    date: "March 10, 2024",
    fullIngredients: [
      "**2 cups** PopLotus Roasted Makhana",
      "**1/2 cup** finely chopped onion",
      "**1/2 cup** finely chopped tomato",
      "**1/4 cup** finely chopped cucumber",
      "**2 tbsp** green chutney",
      "**2 tbsp** tamarind chutney",
      "**1 tbsp** lemon juice",
      "**1/2 tsp** chaat masala",
      "Salt to taste",
      "Fresh coriander for garnish",
    ],
    fullInstructions: [
      "In a large bowl, combine roasted makhana, onion, tomato, and cucumber.",
      "Add green chutney, tamarind chutney, lemon juice, chaat masala, and salt.",
      "Mix everything gently until well combined.",
      "Garnish with fresh coriander and serve immediately.",
      "**Pro Tip:** For extra crunch, add some crushed papdi or sev.",
    ],
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
    date: "March 8, 2024",
    fullContent: `
      Makhana, or foxnuts, have a rich history deeply intertwined with Indian culture and traditional medicine. For thousands of years, these humble lotus seeds have been revered not just for their taste but also for their medicinal properties.

      ### Origins in Ancient India
      
      The cultivation of makhana dates back to ancient times in the wetlands of Bihar, India, which remains the largest producer globally. Historical texts and Ayurvedic scriptures mention makhana as a valuable food source and a potent ingredient in traditional remedies.

      ### Ayurvedic Significance
      
      In Ayurveda, makhana is known as 'phool makhana' and is highly regarded for its cooling properties and nutritional value. It's often recommended for various ailments, including digestive issues, kidney problems, and general weakness. It's considered a sattvic food, promoting purity and balance.

      ### Cultural and Religious Importance
      
      Makhana holds significant cultural and religious importance in India. It's frequently used in religious ceremonies, offerings to deities, and as a fasting food due to its purity and nutritional benefits. During festivals like Navratri, makhana is a staple snack.

      ### Modern Revival
      
      In recent decades, makhana has seen a resurgence in popularity as a healthy snack alternative globally. Its gluten-free, low-calorie, and nutrient-rich profile makes it a favorite among health-conscious consumers. PopLotus is proud to continue this ancient tradition by bringing you premium quality makhana.

      **Historical Highlights:**
      *   **Ancient Times:** Cultivation began in Bihar, India.
      *   **Ayurveda:** Valued for medicinal properties and nutritional benefits.
      *   **Religious Use:** Integral to ceremonies and fasting.
      *   **Global Popularity:** Resurgence as a healthy snack.
    `,
  },
  {
    id: 5,
    type: "recipe",
    title: "Chocolate Makhana Energy Balls",
    excerpt: "No-bake energy balls that combine the goodness of makhana with rich chocolate flavor.",
    image: "/chocolate-energy-balls.png",
    author: "Nutritionist Kavya",
    readTime: "5 min",
    cookTime: "15 min",
    difficulty: "Easy",
    tags: ["Energy", "No-Bake", "Healthy"],
    date: "March 5, 2024",
    fullIngredients: [
      "**1 cup** PopLotus Roasted Makhana, crushed",
      "**1/2 cup** dates, pitted and chopped",
      "**1/4 cup** cocoa powder",
      "**2 tbsp** almond butter",
      "**1 tbsp** honey or maple syrup (optional)",
      "A pinch of salt",
      "Desiccated coconut for coating (optional)",
    ],
    fullInstructions: [
      "In a food processor, combine crushed makhana, dates, cocoa powder, almond butter, and salt.",
      "Blend until the mixture comes together and forms a sticky dough. If too dry, add honey or maple syrup.",
      "Roll the mixture into small, bite-sized balls.",
      "Optionally, roll the energy balls in desiccated coconut.",
      "Refrigerate for 30 minutes to firm up before serving.",
    ],
  },
  {
    id: 6,
    type: "article",
    title: "Sustainable Snacking: Our Environmental Commitment",
    excerpt: "Learn about PopLotus's journey towards sustainable packaging and eco-friendly practices.",
    image: "/sustainability-article.png",
    author: "Sustainability Team",
    readTime: "6 min",
    tags: ["Sustainability", "Environment", "Corporate"],
    date: "March 3, 2024",
    fullContent: `
      At PopLotus, we believe that healthy snacking shouldn't come at the expense of our planet. Our commitment to sustainability is at the core of everything we do, from sourcing our premium makhana to our eco-friendly packaging.

      ### Ethical Sourcing
      
      We work directly with local farmers who practice sustainable cultivation methods, ensuring fair wages and minimal environmental impact. Our makhana is grown without harmful pesticides, preserving biodiversity and soil health.

      ### Eco-Friendly Packaging
      
      We are constantly innovating to reduce our carbon footprint. Our packaging is designed to be recyclable and, wherever possible, made from recycled materials. We aim to eliminate single-use plastics and promote a circular economy.

      ### Waste Reduction
      
      Our production processes are optimized to minimize waste. We strive for efficiency at every step, from harvesting to packaging, ensuring that resources are used responsibly.

      ### Community Engagement
      
      We actively engage with our local communities to promote environmental awareness and support initiatives that protect our natural resources. We believe in giving back and fostering a culture of sustainability.

      Join us on our journey towards a healthier planet, one delicious and sustainable snack at a time.

      **Our Sustainable Practices Include:**
      *   **Direct Farmer Partnerships:** Ensuring fair trade and sustainable farming.
      *   **Recyclable Materials:** Prioritizing eco-friendly packaging.
      *   **Minimized Waste:** Optimizing production for efficiency.
      *   **Local Initiatives:** Supporting environmental protection efforts.
    `,
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
                      src={post.image || "/placeholder.svg?height=250&width=400\""}
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

