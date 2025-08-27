"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Heart, Gift, Plus } from "lucide-react"
import { useState } from "react"
import { useCart } from "./cart-context"
import { useWishlist } from "./wishlist-context"
import ProductDetailsPopup from "./product-details-popup"
import Product3DViewer from "./product-3d-viewer"
import WishlistNotification from "./wishlist-notification"

const ourProducts = [
  {
    id: "cream-onion-40g",
    name: "Cream & Onion Makhana",
    description:
      "Creamy and savory blend with the perfect hint of onion. A sophisticated flavor that's both comforting and exciting.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cream%20and%20onion-SVzxWBGMMqH3hi1ol4OLCFlZ2Gnlr7.png",
    price: 299,
    weight: "40g",
    tags: ["New", "Popular"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
    category: "makhana",
  },
  {
    id: "cheese-90g",
    name: "Cheese Makhana",
    description:
      "Rich, cheesy goodness that melts in your mouth. Perfect for cheese lovers seeking a healthy alternative.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cheese-69eadAxMyEzZKS89eKZqvYJByKbFg5.png",
    price: 329,
    weight: "90g",
    tags: ["Bestseller", "Savory"],
    nutritionHighlights: ["High Protein", "Low Fat", "Gluten Free"],
    category: "makhana",
  },
  {
    id: "pink-salt-250g",
    name: "Himalayan Pink Salt",
    description: "Pure makhana with premium Himalayan pink salt. Simple elegance with mineral-rich goodness.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pink%20salt-74XlnWSRXCYUzhNJAXB9hNsz93voyA.png",
    price: 349,
    weight: "250g",
    tags: ["Premium", "Natural"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
    category: "makhana",
  },
  {
    id: "tomato-chilli-90g",
    name: "Tomato Chilli Makhana",
    description: "Tangy tomato with a spicy kick. Bold flavors that awaken your taste buds with every bite.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tomato%20chilli-e42wl1pg20CJPPZLRzUwLGvYcaigew.png",
    price: 319,
    weight: "90g",
    tags: ["Spicy", "Bold"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
    category: "makhana",
  },
  {
    id: "pudina-40g",
    name: "Pudina Makhana",
    description:
      "Fresh mint flavor that's refreshing and invigorating. Perfect for a cool, crispy snacking experience.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pudina-NHvMkswWqum1so9v41bDNLzOAHpM6F.png",
    price: 299,
    weight: "40g",
    tags: ["Fresh", "Cooling"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
    category: "makhana",
  },
  {
    id: "peri-peri-90g",
    name: "Peri Peri Makhana",
    description:
      "Fiery peri peri spices for those who love heat. An intense flavor journey that's absolutely addictive.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/peri%20peri-sUMcH4ffBIoMgwa2evuhtS4WOeCa4u.png",
    price: 329,
    weight: "90g",
    tags: ["Hot", "Spicy"],
    nutritionHighlights: ["Low Fat", "High Protein", "Gluten Free"],
    category: "makhana",
  },
  {
    id: "raw-makhana-250g",
    name: "Raw Makhana",
    description: "Pure, natural lotus seeds in their original form. Perfect for home cooking or healthy snacking.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/raw%20makhana-npD1T7NkCGwKO4yOMcJ5vNPkmtKACt.png",
    price: 249,
    weight: "250g",
    tags: ["Natural", "Versatile"],
    nutritionHighlights: ["100% Natural", "Vegan", "Gluten-free", "High Protein"],
    category: "makhana",
  },
  {
    id: "chips-classic-50g",
    name: "Classic Makhana Chips",
    description: "Crispy makhana chips with a light seasoning. Perfect for guilt-free snacking anytime.",
    image: "/makhana-chips-classic-flavor-packaging.png",
    price: 199,
    weight: "50g",
    tags: ["New", "Crispy"],
    nutritionHighlights: ["Baked", "Low Fat", "High Protein"],
    category: "chips",
  },
  {
    id: "chips-bbq-50g",
    name: "BBQ Makhana Chips",
    description: "Smoky BBQ flavored makhana chips with authentic spices. A healthy twist on your favorite snack.",
    image: "/makhana-chips-bbq-flavor-packaging.png",
    price: 219,
    weight: "50g",
    tags: ["Smoky", "Bold"],
    nutritionHighlights: ["Baked", "Low Fat", "High Protein"],
    category: "chips",
  },
  {
    id: "chips-masala-50g",
    name: "Masala Makhana Chips",
    description: "Traditional Indian masala blend on crispy makhana chips. Authentic flavors in every bite.",
    image: "/makhana-chips-masala-flavor-packaging.png",
    price: 219,
    weight: "50g",
    tags: ["Spicy", "Traditional"],
    nutritionHighlights: ["Baked", "Low Fat", "High Protein"],
    category: "chips",
  },
  {
    id: "cookies-vanilla-100g",
    name: "Vanilla Makhana Cookies",
    description: "Soft and chewy cookies made with makhana flour and natural vanilla. A healthy dessert option.",
    image: "/makhana-cookies-vanilla-flavor-packaging.png",
    price: 299,
    weight: "100g",
    tags: ["Sweet", "Healthy"],
    nutritionHighlights: ["No Refined Sugar", "High Protein", "Gluten Free"],
    category: "cookies",
  },
  {
    id: "cookies-chocolate-100g",
    name: "Chocolate Makhana Cookies",
    description: "Rich chocolate cookies with makhana flour. Indulgent taste with nutritious benefits.",
    image: "/makhana-cookies-chocolate-flavor-packaging.png",
    price: 329,
    weight: "100g",
    tags: ["Chocolate", "Indulgent"],
    nutritionHighlights: ["No Refined Sugar", "High Protein", "Antioxidants"],
    category: "cookies",
  },
  {
    id: "cookies-almond-100g",
    name: "Almond Makhana Cookies",
    description: "Nutty almond cookies with makhana flour and real almond pieces. Perfect with tea or coffee.",
    image: "/makhana-cookies-almond-flavor-packaging.png",
    price: 349,
    weight: "100g",
    tags: ["Nutty", "Premium"],
    nutritionHighlights: ["No Refined Sugar", "High Protein", "Healthy Fats"],
    category: "cookies",
  },
  {
    id: "chana-classic-75g",
    name: "Classic Chana Jor Garam",
    description: "Traditional flattened chickpeas with authentic spices. A classic Indian street food snack.",
    image: "/chana-jor-garam-classic-flavor-packaging.png",
    price: 149,
    weight: "75g",
    tags: ["Traditional", "Street Food"],
    nutritionHighlights: ["High Protein", "High Fiber", "Roasted"],
    category: "chana",
  },
  {
    id: "chana-spicy-75g",
    name: "Spicy Chana Jor Garam",
    description: "Extra spicy flattened chickpeas with red chili and black pepper. For those who love heat.",
    image: "/chana-jor-garam-spicy-flavor-packaging.png",
    price: 159,
    weight: "75g",
    tags: ["Spicy", "Hot"],
    nutritionHighlights: ["High Protein", "High Fiber", "Metabolism Boost"],
    category: "chana",
  },
  {
    id: "chana-tangy-75g",
    name: "Tangy Chana Jor Garam",
    description: "Zesty flattened chickpeas with tamarind and chaat masala. A perfect balance of tangy and spicy.",
    image: "/chana-jor-garam-tangy-flavor-packaging.png",
    price: 159,
    weight: "75g",
    tags: ["Tangy", "Zesty"],
    nutritionHighlights: ["High Protein", "High Fiber", "Digestive"],
    category: "chana",
  },
]

const giftingProducts = [
  {
    id: "discovery-box",
    name: "Flavor Discovery Box",
    description:
      "Experience all six premium flavors in one elegant gift box. Perfect for sharing or discovering your favorite.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sample-5F5Y6dW7CHMY7bJ4pXMgbEm41Xh0uY.png",
    price: 599,
    weight: "6 x 10g",
    tags: ["Gift Box", "Bestseller"],
    nutritionHighlights: ["All Flavors", "Gift Ready", "Premium Packaging"],
    category: "gift",
  },
]

export default function ProductsGrid() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false)
  const [wishlistNotification, setWishlistNotification] = useState<{ show: boolean; productName: string }>({
    show: false,
    productName: "",
  })

  const { addItem } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
      setWishlistNotification({ show: true, productName: product.name })
    }
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.weight,
    })
  }

  const handleEnquire = (product: any) => {
    setSelectedProduct(product)
    setIsPopupOpen(true)
  }

  const handleQuickView = (product: any) => {
    setSelectedProduct(product)
    setIs3DViewerOpen(true)
  }

  const ProductCard = ({ product, showGiftIcon = false }: { product: any; showGiftIcon?: boolean }) => (
    <Card
      key={product.id}
      className="group cursor-pointer border-0 shadow-md hover:shadow-lg transition-shadow duration-200 relative overflow-hidden"
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-64 object-contain"
          />

          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.tags.map((tag: string) => (
              <Badge key={tag} className="bg-gold text-white text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>

          {/* Gift icon for gifting products */}
          {showGiftIcon && (
            <div className="absolute bottom-4 left-4">
              <Gift className="w-6 h-6 text-gold" />
            </div>
          )}
        </div>

        <div className="p-6 h-64 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl font-semibold text-gray-900">{product.name}</h3>
            <div className="text-right">
              <p className="font-bold text-gold text-lg">₹{product.price}</p>
              <p className="text-sm text-gray-500">{product.weight}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 flex-grow">{product.description}</p>

          {/* Nutrition highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.nutritionHighlights.map((highlight: string) => (
                <span key={highlight} className="text-xs bg-beige/30 text-gray-700 px-2 py-1 rounded-full">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Button
              onClick={() => handleAddToCart(product)}
              className="flex-1 h-11 bg-gold hover:bg-gold/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={() => handleEnquire(product)}
              variant="outline"
              className="flex-1 h-11 border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
            >
              Enquire
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const BuildYourOwnBoxCard = () => (
    <Card className="group relative cursor-pointer border-2 border-dashed border-gold/30 hover:border-gold transition-all duration-700 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-gold/30 group-hover:to-amber-300/40 transition-all duration-500 z-0"></div>

      <CardContent className="relative z-10 p-6">
        <div className="relative overflow-hidden h-64 flex flex-col items-center justify-center transition-all duration-500">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-6 left-6 w-2 h-2 bg-gold/40 rounded-full animate-pulse"></div>
            <div
              className="absolute top-4 right-8 text-gold/30 text-sm animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              ✦
            </div>
            <div
              className="absolute bottom-8 left-4 text-beige/50 text-xs animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              ✧
            </div>
            <div
              className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-gold/30 rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <Gift className="w-8 h-8 text-gold" />
          </div>

          <div className="grid grid-cols-3 gap-3 w-32 h-20 mx-auto mb-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border-2 border-dashed border-gold/20 flex items-center justify-center text-lg font-bold transition-all duration-300 cursor-pointer shadow-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="transition-all duration-300 text-gold/60 group-hover:text-gold opacity-0 group-hover:opacity-100">
                  ?
                </span>
              </div>
            ))}
          </div>

          <h3 className="font-serif text-xl font-semibold text-gold mb-2 text-center">Build Your Own Box</h3>
          <p className="text-sm text-gray-600 px-4 text-center leading-relaxed">
            Create a custom mix of your favorite flavors
          </p>
        </div>

        <div className="p-6 transition-all duration-500">
          <div className="text-center mb-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Choose from all our premium products and create your perfect snacking combination
            </p>
          </div>

          <Button
            onClick={() => {
              const buildYourOwnSection = document.getElementById("build-your-own-box")
              if (buildYourOwnSection) {
                buildYourOwnSection.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
            className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg opacity-100"
          >
            Start Building
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const makhanaProducts = ourProducts.filter((p) => p.category === "makhana")
  const chipsProducts = ourProducts.filter((p) => p.category === "chips")
  const cookiesProducts = ourProducts.filter((p) => p.category === "cookies")
  const chanaProducts = ourProducts.filter((p) => p.category === "chana")

  return (
    <>
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flavored Makhana Section */}
          <section className="mb-20" id="flavoured-makhana-section">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Flavored Makhana</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Premium makhana in exciting flavors, crafted with the finest ingredients for your healthy snacking
                pleasure
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BuildYourOwnBoxCard />
              {makhanaProducts.map((product) => (
                <div
                  key={product.id}
                  id={`${product.name.toLowerCase().replace(/\s+/g, "-").replace("&", "")}-section`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>

          {/* Makhana Chips Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Makhana Chips</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Crispy, baked makhana chips in delicious flavors. A healthier alternative to traditional chips
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chipsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Makhana Cookies Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Makhana Cookies</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Soft, chewy cookies made with nutritious makhana flour. Guilt-free indulgence for your sweet cravings
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cookiesProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Chana Jor Garam Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Chana Jor Garam</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Traditional flattened chickpeas with authentic Indian spices. A protein-rich street food favorite
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chanaProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Gifting Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <Gift className="w-8 h-8 inline-block mr-3 text-gold" />
                Gifting
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Thoughtfully curated gift boxes perfect for sharing the joy of healthy snacking with your loved ones
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {giftingProducts.map((product) => (
                <ProductCard key={product.id} product={product} showGiftIcon={true} />
              ))}
            </div>
          </section>

          {/* Call to action */}
          <div className="text-center mt-16 bg-beige/20 rounded-2xl p-12">
            <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">Still can't decide?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start with our Flavor Discovery Box to experience all our premium varieties, or contact our team for
              personalized recommendations based on your taste preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() =>
                  handleAddToCart({
                    id: "discovery-box",
                    name: "Flavor Discovery Box",
                    price: 599,
                    image:
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sample-5F5Y6dW7CHMY7bJ4pXMgbEm41Xh0uY.png",
                    weight: "6 x 10g",
                  })
                }
                className="bg-gold hover:bg-gold/90 text-white px-8 py-3 text-lg"
              >
                Shop Discovery Box
              </Button>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 text-lg bg-transparent"
                onClick={() => {
                  window.open(
                    "mailto:contact@poplotus.in?subject=Product Recommendations&body=Hi PopLotus team, I would like personalized product recommendations based on my taste preferences.",
                    "_blank",
                  )
                }}
              >
                Get Recommendations
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailsPopup product={selectedProduct} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <Product3DViewer product={selectedProduct} isOpen={is3DViewerOpen} onClose={() => setIs3DViewerOpen(false)} />
      <WishlistNotification
        show={wishlistNotification.show}
        productName={wishlistNotification.productName}
        onClose={() => setWishlistNotification({ show: false, productName: "" })}
      />
    </>
  )
}
