import Navigation from "@/components/navigation"
import BlogsHero from "@/components/blogs-hero"
import BlogGrid from "@/components/blog-grid"
import Footer from "@/components/footer"

export default function BlogsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <BlogsHero />
        <BlogGrid />
      </main>
      <Footer />
    </div>
  )
}
