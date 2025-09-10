import Navigation from "@/components/navigation"
import VideoBanner from "@/components/video-banner"
import SuperfoodSection from "@/components/superfood-section"
import ProductGrid from "@/components/product-grid"
import WhySwitchSection from "@/components/why-switch-section"
import TestimonialsSection from "@/components/testimonials-section"
import DidYouKnowSection from "@/components/did-you-know-section"
import CertificationsStrip from "@/components/certifications-strip"
import FindUsSection from "@/components/find-us-section"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import CartProgressBar from "@/components/cart-progress-bar"
import WelcomePopup from "@/components/welcome-popup"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <VideoBanner />
      <SuperfoodSection />
      <ProductGrid />
      <WhySwitchSection />
      <TestimonialsSection />
      <DidYouKnowSection />
      <CertificationsStrip />
      <FindUsSection />
      <Newsletter />
      <Footer />
      <CartProgressBar />
      <WelcomePopup />
    </div>
  )
}
