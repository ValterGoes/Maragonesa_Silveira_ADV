import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logoCompleta from '../assets/images/logo_completo_branco.png'

function BentoCard({ service, index, large, inView, featuredLabel, isOpen = false, onToggle }) {
  const showDescription = large || isOpen

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onClick={!large && onToggle ? onToggle : undefined}
      className={`group relative self-start rounded-2xl border border-white/[0.06] bg-charcoal-mid p-3 sm:p-4 transition-all duration-500 hover:border-burgundy/20 hover:bg-charcoal-light ${
        large ? 'row-span-2 flex flex-col justify-between overflow-hidden' : 'cursor-pointer overflow-visible lg:relative'
      } ${isOpen && !large ? 'z-20' : ''}`}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-burgundy/[0.06] blur-3xl" />
      </div>

      {/* Background number */}
      <span className="pointer-events-none absolute right-4 -bottom-2 select-none font-serif text-7xl font-bold leading-none text-white/[0.02] transition-colors duration-500 group-hover:text-gold/[0.05]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white/90 sm:text-lg" role="heading" aria-level="3">{service.title}</h3>

          {!large && (
            <button
              type="button"
              aria-label={isOpen ? `Fechar ${service.title}` : `Expandir ${service.title}`}
              aria-expanded={isOpen}
              onClick={(event) => {
                event.stopPropagation()
                onToggle?.()
              }}
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isOpen
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-white/15 bg-white/5 text-white/50 group-hover:border-gold/30 group-hover:text-gold/80'
              }`}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {showDescription && (
            <motion.div
              initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`${!large ? 'lg:absolute lg:left-0 lg:right-0 lg:top-full lg:z-20 lg:pt-2' : ''}`}
            >
              <motion.p
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="w-full overflow-hidden rounded-xl border border-white/[0.04] bg-charcoal-light/90 p-3 text-sm leading-relaxed text-white/55 shadow-[0_14px_30px_rgba(0,0,0,0.24)] transition-colors duration-300 group-hover:text-white/70 whitespace-pre-line lg:backdrop-blur-sm"
              >
                {service.description}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {large && (
        <div className="relative mt-6 flex items-center gap-2 text-[12px] font-medium text-gold/60 transition-colors group-hover:text-gold">
          <span className="h-px w-4 bg-current" />
          {featuredLabel}
        </div>
      )}
    </motion.div>
  )
}

export default function ServicesSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [expandedIndex, setExpandedIndex] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  const services = t('services.items', { returnObjects: true })

  const handleToggle = (index) => {
    setExpandedIndex((current) => (current === index ? null : index))
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="grain relative overflow-hidden bg-charcoal py-10 sm:py-18 lg:py-22"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 2xl:max-w-[1400px]">
        {/* Parallax bg logo — centered behind cards */}
        <motion.div
          style={{ y: bgY }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none"
        >
          <img
            src={logoCompleta}
            alt=""
            className="w-460 max-w-none opacity-[0.01]"
          />
        </motion.div>
        {/* Header */}
        <div className="relative z-10 mb-16 flex items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-px w-8 bg-burgundy" />
              <div className="h-px w-12 bg-gold" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
                {t("services.eyebrow")}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              {t("services.title1")}
              <br />
              <span className="text-white/30">{t("services.title2")}</span>
              <span className="text-gold">.</span>
            </motion.h2>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="relative z-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-auto xl:auto-rows-auto">
          {/* Large featured card */}
          <BentoCard
            service={services[0]}
            index={0}
            large
            inView={inView}
            featuredLabel={t("services.featured")}
            isOpen
          />

          <div className="grid gap-3 sm:gap-5 lg:grid-cols-2 lg:col-span-2 lg:items-start">
            {/* Compact cards */}
            {services.slice(1).map((service, i) => (
              <BentoCard
                key={service.title}
                service={service}
                index={i + 1}
                inView={inView}
                isOpen={expandedIndex === i + 1}
                onToggle={() => handleToggle(i + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
