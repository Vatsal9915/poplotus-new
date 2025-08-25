import Image from "next/image"

export default function BrandMission() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">The PopLotus Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              PopLotus began with a simple observation: healthy snacking options were either tasteless or filled with
              artificial ingredients. Our founders, passionate about nutrition and flavor, embarked on a mission to
              change this narrative.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We discovered makhana - the ancient superfood that has been cherished in Indian households for centuries.
              These lotus seeds are not just nutritious but incredibly versatile, offering the perfect canvas for
              creating delicious, guilt-free snacks.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, PopLotus stands as a testament to the belief that healthy eating should never compromise on taste.
              Every product we create is a celebration of this philosophy.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/brand-story-image.png"
              alt="PopLotus Brand Story"
              width={600}
              height={500}
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <Image
              src="/mission-values-image.png"
              alt="Our Mission and Values"
              width={600}
              height={500}
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Mission & Values</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl font-semibold text-gold mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To make healthy snacking accessible, delicious, and sustainable by transforming traditional superfoods
                  into modern, premium snacks that nourish both body and soul.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-gold mb-3">Quality First</h3>
                <p className="text-gray-600 leading-relaxed">
                  We source only the finest makhana from trusted farmers and use traditional roasting methods combined
                  with modern food safety standards.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-gold mb-3">Sustainability</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our commitment extends beyond taste to environmental responsibility, supporting sustainable farming
                  practices and eco-friendly packaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
