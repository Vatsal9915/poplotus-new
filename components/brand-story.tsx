import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BrandStory() {
  return (
    <section className="py-16 bg-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            PopLotus was born from a simple belief: healthy snacking shouldn't compromise on taste. We source the finest
            makhana from traditional farms and transform them into premium snacks that nourish your body and delight
            your senses. Every bite tells a story of quality, tradition, and innovation.
          </p>
          <Link href="/about">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white bg-transparent">
              Read More About Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
