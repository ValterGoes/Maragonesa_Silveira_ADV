import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import thumbAposentadoria from '../assets/images/aposentadoria.webp'
import thumbAuxilioDoenca from '../assets/images/auxilio-doenca.webp'
import thumbBeneficioNegado from '../assets/images/beneficio-negado.webp'
import thumbAuxilioAcidente from '../assets/images/auxilio-acidente.webp'
import thumbIsencao from '../assets/images/isencao-imposto.webp'

const videoData = [
  { id: 'M7Pp0rcRMXo', thumb: thumbAposentadoria },
  { id: '93yJS05ofQQ', thumb: thumbAuxilioDoenca },
  { id: 'G_st6ggeMvI', thumb: thumbBeneficioNegado },
  { id: 'daXYaR9IJgo', thumb: thumbAuxilioAcidente },
  { id: 'f4RqiAIx38A', thumb: thumbIsencao },
]

function LazyVideo({ id, caption, thumb, index, inView, playLabel }) {
  const [playing, setPlaying] = useState(false)
  const handlePlay = useCallback(() => setPlaying(true), [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="group relative flex-none w-[260px] snap-center overflow-hidden rounded-2xl border border-gray-border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-gold/20 hover:shadow-[0_8px_30px_rgba(197,160,89,0.08)] sm:w-[280px] lg:w-[220px] xl:w-[230px] 2xl:w-[260px]"
    >
      <div className="relative aspect-[9/16] bg-black overflow-hidden rounded-t-2xl">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={caption}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
          />
        ) : (
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full cursor-pointer border-none p-0 bg-black"
            aria-label={`${playLabel}: ${caption}`}
          >
            <img
              src={thumb}
              alt={caption}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </button>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-navy">{caption}</p>
      </div>
    </motion.div>
  )
}

export default function VideosSection() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const carouselRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  const captions = t('videos.captions', { returnObjects: true })

  const checkScroll = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = carouselRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll])

  const scroll = (dir) => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector(':first-child')
    if (!card) return
    const cardWidth = card.offsetWidth + 12
    el.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
  }

  // Drag to scroll
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const onPointerDown = (e) => {
    isDragging.current = true
    startX.current = e.clientX
    scrollStart.current = carouselRef.current.scrollLeft
    carouselRef.current.style.cursor = 'grabbing'
    carouselRef.current.style.userSelect = 'none'
  }

  const onPointerMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - startX.current
    carouselRef.current.scrollLeft = scrollStart.current - dx
  }

  const onPointerUp = () => {
    isDragging.current = false
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab'
      carouselRef.current.style.userSelect = ''
    }
  }

  return (
    <section
      id="videos"
      ref={ref}
      className="relative overflow-hidden bg-offwhite py-28 lg:py-36"
    >
      {/* Parallax bg logo */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-serif text-[16rem] font-bold leading-none text-navy/[0.03] xl:text-[50rem]">
          {t('videos.bgText')}
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 2xl:max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-gold" />
          <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
            {t('videos.eyebrow')}
          </span>
        </motion.div>

        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 font-sans text-3xl font-medium leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              {t('videos.title1')}
              <br />
              <span className="text-navy/30">{t('videos.title2')}</span>
              <span className="text-gold">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-lg text-base leading-relaxed text-gray-text"
            >
              {t('videos.subtitle')}
            </motion.p>
          </div>

          {/* Arrow buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="hidden md:flex lg:hidden items-center gap-2"
          >
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 hover:shadow-md disabled:opacity-20 disabled:cursor-default"
              aria-label={t('videos.prev')}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 hover:shadow-md disabled:opacity-20 disabled:cursor-default"
              aria-label={t('videos.next')}
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Fade edges */}
          <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-offwhite to-transparent transition-opacity duration-300 lg:hidden ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-offwhite to-transparent transition-opacity duration-300 lg:hidden ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          <div
            ref={carouselRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="videos-carousel flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory cursor-grab"
            style={{ paddingInline: 'max(1rem, calc(50% - 150px))' }}
          >
            {videoData.map((video, index) => (
              <LazyVideo
                key={video.id}
                id={video.id}
                caption={captions[index]}
                thumb={video.thumb}
                index={index}
                inView={inView}
                playLabel={t('videos.play')}
              />
            ))}
          </div>
        </div>

        {/* Mobile arrows — below carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-4 flex md:hidden items-center justify-center gap-3"
        >
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 disabled:opacity-20 disabled:cursor-default"
            aria-label={t('videos.prev')}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 disabled:opacity-20 disabled:cursor-default"
            aria-label={t('videos.next')}
          >
            <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* YouTube CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="https://www.youtube.com/@maragonesaSilveira"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#ff0000]/20 bg-white px-6 py-3 text-sm font-semibold text-[#ff0000] transition-all duration-300 hover:bg-[#ff0000] hover:text-white hover:shadow-[0_8px_30px_rgba(255,0,0,0.15)]"
          >
            <Play size={16} className="fill-current" />
            {t('videos.youtube')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
