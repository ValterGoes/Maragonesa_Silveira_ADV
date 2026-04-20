import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import advImg from '../assets/images/adv3.webp'

export default function AboutSection() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const cards = t('about.cards', { returnObjects: true })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-16 sm:py-42 lg:pt-56"
    >
      {/* Large background text */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none flex flex-col items-center justify-center text-center 2xl:pt-30"
      >
        {t('about.bgText').split(' ').map((word, i) => (
          <span
            key={i}
            className="block font-serif text-[10rem] font-bold leading-[0.85] text-navy/3 sm:text-[16rem] md:text-[20rem] xl:text-[30rem] 2xl:text-[36rem]"
          >
            {word}
          </span>
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 2xl:max-w-[1400px]">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Left — photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div style={{ y: imgY }} className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-burgundy/15 via-transparent to-gold/10" />
              <img
                src={advImg}
                alt={t('about.imgAlt')}
                className="relative w-full rounded-2xl object-cover shadow-[0_16px_50px_rgba(0,0,0,0.12)]"
              />
              {/* Accent corner */}
              <div className="absolute -top-3 -left-3 h-12 w-px bg-burgundy/50" />
              <div className="absolute -top-3 -left-3 h-px w-12 bg-burgundy/50" />
            </motion.div>
          </motion.div>

          {/* Right — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-px w-8 bg-burgundy" />
              <div className="h-px w-4 bg-gold" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
                {t('about.eyebrow')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-3xl font-medium leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              {t('about.title1')}
              <br />
              <span className="text-gold">{t('about.title2')}</span>
              <br />
              <span className="text-navy/30">{t('about.title3')}</span>
              <span className="text-burgundy">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base leading-relaxed text-gray-text sm:mt-8 sm:text-lg sm:leading-[1.8]"
              dangerouslySetInnerHTML={{ __html: t('about.description') }}
            />
          </div>
        </div>

        {/* Value cards — full width below the 2-col grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-md:grid-cols-1"
        >
          {cards.map(({ label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="group relative flex-1 overflow-hidden rounded-2xl border border-gray-border bg-white p-8 sm:p-10 transition-all duration-300 hover:border-burgundy/20 hover:shadow-[0_8px_30px_rgba(74,111,165,0.06)]"
            >
              <span className="absolute -right-2 -top-4 font-serif text-7xl font-bold text-burgundy/[0.04] transition-colors group-hover:text-burgundy/[0.08]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="relative text-base font-semibold text-navy sm:text-lg">
                {label}
              </p>
              <p className="relative mt-3 text-sm leading-relaxed text-gray-text">
                {sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
