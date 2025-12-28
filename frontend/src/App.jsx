import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import CompanyProfile from "@/components/sections/CompanyProfile"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import WelcomeMessage from "@/components/sections/WelcomeMessage"
import Commitment from "@/components/sections/Commitment"

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section with Carousel */}
      <Hero />

      {/* Company Profile Section */}
      <CompanyProfile />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Welcome Message from Director */}
      <WelcomeMessage />

      {/* Commitment Section */}
      <Commitment />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
