import Navigation from "@/components/navigation"
import AboutHero from "@/components/about-hero"
import BrandMission from "@/components/brand-mission"
import Timeline from "@/components/timeline"
import BehindSnacksSection from "@/components/behind-snacks-section"
import AboutCtaSection from "@/components/about-cta-section"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <AboutHero />
        <BrandMission />
        <Timeline />
        <BehindSnacksSection />
        <AboutCtaSection />
      </main>
      <Footer />
    </div>
  )
}
