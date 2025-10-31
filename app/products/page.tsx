import Navigation from "@/components/navigation"
import PackagingTransition from "@/components/packaging-transition"
import ProductsGrid from "@/components/products-grid"
import BuildYourOwnBox from "@/components/build-your-own-box"
import CalorieCalculator from "@/components/calorie-calculator"
import Footer from "@/components/footer"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <PackagingTransition />
        <ProductsGrid />
        <BuildYourOwnBox />
        <CalorieCalculator />
      </main>
      <Footer />
    </div>
  )
}
