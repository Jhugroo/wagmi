import { AfterHero } from "@/components/after-hero"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AfterHero />
    </main>
  )
}

