import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import VideosSection from './components/VideosSection'
import ServicesSection from './components/ServicesSection'
import AboutSection from './components/AboutSection'
import GoogleReviews from './components/GoogleReviews'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'


export default function App() {
  useEffect(() => {
    const handleGlobalClick = (event) => {
      const link = event.target.closest('a')
      if (link && link.href.includes('wa.me')) {
        if (typeof window.gtag_report_conversion === 'function') {
          window.gtag_report_conversion()
          console.log('Conversão disparada via clique global!')
        }
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideosSection />
        <ServicesSection />
        <AboutSection />
        <GoogleReviews />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
