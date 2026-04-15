import Header from './components/Header'
import Hero from './components/Hero'
import VideosSection from './components/VideosSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideosSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
