import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Leaf, Recycle, Users, Target, Award, Globe, Heart, Sprout } from "lucide-react"
import Image from "next/image"

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Leaf className="w-12 h-12 text-green-600" />
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900">Our Sustainability Vision</h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                At PopLotus, we believe in creating delicious snacks while nurturing our planet and communities. Our
                commitment to sustainability drives every decision we make, from sourcing to packaging.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gold/10 to-yellow-100 rounded-2xl p-12 text-center">
              <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                "Nourishing People, Nurturing Planet"
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                We are committed to creating a sustainable future where healthy snacking goes hand-in-hand with
                environmental stewardship. Through responsible sourcing, eco-friendly practices, and community
                empowerment, we're building a business that benefits everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Key Pillars */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Sustainability Pillars
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Four core principles guide our sustainable practices and long-term vision
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">Sustainable Sourcing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Direct partnerships with farmers practicing organic and regenerative agriculture methods
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <Recycle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">Eco-Friendly Packaging</h3>
                <p className="text-gray-600 leading-relaxed">
                  Biodegradable and recyclable packaging materials to minimize environmental impact
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">Community Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Empowering local farming communities through fair trade and skill development programs
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/30 transition-colors">
                  <Target className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">Carbon Neutral Goals</h3>
                <p className="text-gray-600 leading-relaxed">
                  Working towards carbon neutrality through renewable energy and offset programs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact So Far</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Measurable progress towards a more sustainable future
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Farmers Supported</div>
                <p className="text-gray-600">Direct partnerships ensuring fair wages and sustainable practices</p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">75%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Packaging Recyclable</div>
                <p className="text-gray-600">Moving towards 100% sustainable packaging by 2025</p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">10,000</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Trees Planted</div>
                <p className="text-gray-600">Contributing to reforestation and carbon offset initiatives</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainable Practices */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Sustainable Practices
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every step of our process is designed with sustainability in mind
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">Organic Farming Support</h3>
                    <p className="text-gray-600">
                      We partner exclusively with farmers who use organic, chemical-free farming methods that preserve
                      soil health and biodiversity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Recycle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">Circular Economy</h3>
                    <p className="text-gray-600">
                      Our packaging is designed for recyclability, and we're implementing take-back programs for used
                      packaging materials.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">Community Wellness</h3>
                    <p className="text-gray-600">
                      We invest in healthcare and education programs for farming communities, ensuring long-term
                      prosperity and well-being.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/sustainable-farming-practices.png"
                  alt="Sustainable farming practices"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Future Goals */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our 2030 Sustainability Goals
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Ambitious targets for a more sustainable future</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 mb-4">100% Carbon Neutral</h3>
                <p className="text-gray-600">
                  Achieve complete carbon neutrality across our entire supply chain and operations
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
                <Recycle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 mb-4">Zero Waste Packaging</h3>
                <p className="text-gray-600">Transition to 100% compostable or recyclable packaging materials</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-gray-900 mb-4">1000+ Farmers Empowered</h3>
                <p className="text-gray-600">
                  Double our farmer network while ensuring fair wages and sustainable practices
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-gold to-yellow-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Sustainability Journey
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Every PopLotus snack you choose is a vote for a more sustainable future. Together, we can create positive
              change for our planet and communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-gold font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                Shop Sustainable Snacks
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-gold transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
