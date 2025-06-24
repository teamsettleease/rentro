import { Navigation } from "@/components/hero-page/navigation"
import { HeroSection } from "@/components/hero-page/hero-section"
import { SearchSection } from "@/components/hero-page/search-section"
import { CTASection } from "@/components/hero-page/cta-section"
import { FeaturesSection } from "@/components/hero-page/features-section"
import { ResponsiveBackground } from "@/components/hero-page/responsive-background"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ResponsiveBackground />

      <Navigation />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center px-4 md:px-6 pt-2 md:pt-4">
        <HeroSection />
        <SearchSection />
        <CTASection />
        <FeaturesSection />
      </div>
    </div>
  )
}
