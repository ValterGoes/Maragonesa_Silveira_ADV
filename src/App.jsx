import { lazy, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import DeferredSection from './components/DeferredSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const FAQSection = lazy(() => import('./components/FAQSection'))
const VideosSection = lazy(() => import('./components/VideosSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const AboutSection = lazy(() => import('./components/AboutSection'))
const GoogleReviews = lazy(() => import('./components/GoogleReviews'))
const ContactSection = lazy(() => import('./components/ContactSection'))

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
        <DeferredSection Component={FAQSection} />
        <DeferredSection Component={VideosSection} id="videos" />
        <DeferredSection Component={ServicesSection} id="services" />
        <DeferredSection Component={AboutSection} id="about" />
        <DeferredSection Component={GoogleReviews} />
        <DeferredSection Component={ContactSection} id="contact" />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
