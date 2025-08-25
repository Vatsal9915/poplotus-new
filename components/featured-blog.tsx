import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function FeaturedBlog() {
  return (
    <section className="py-20 bg-beige/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Recipe</h2>
          <p className="text-lg text-gray-600">Discover delicious ways to enjoy makhana beyond snacking</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-full">
                <Image
                  src="/makhana-kheer.png"
                  alt="Makhana Kheer Recipe"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">Creamy Makhana Kheer</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Transform your PopLotus makhana into a rich, creamy dessert that's both indulgent and nutritious. This
                  traditional recipe gets a healthy twist with our premium foxnuts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/blogs">
                    <Button className="bg-gold hover:bg-gold/90 text-white">View Recipe</Button>
                  </Link>
                  <Link href="/blogs">
                    <Button
                      variant="outline"
                      className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent"
                    >
                      More Recipes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
