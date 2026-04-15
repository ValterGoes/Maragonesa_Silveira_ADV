import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import WhatsAppIcon from './WhatsAppIcon'
import capa from '../assets/images/adv4.webp'
import marcadagua from '../assets/images/marcadagua.png'

const WHATSAPP =
  'https://wa.me/5551996839890?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20meu%20benef%C3%ADcio%20previdenci%C3%A1rio.'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="grain relative flex min-h-screen items-center overflow-hidden bg-charcoal"
    >
      {/* Background watermark image */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none absolute right-0 select-none"
      >
        <img
          src={marcadagua}
          alt=""
          aria-hidden="true"
          className="h-260 w-full object-cover opacity-[0.02]"
        />
      </motion.div>

      {/* Accent lines */}
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-burgundy/30 to-transparent sm:left-10 lg:left-20" />
      <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent sm:left-12 lg:left-[5.5rem]" />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10 lg:py-40 2xl:max-w-[1400px]"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* Left — text */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 flex items-center gap-4 sm:mb-8"
            >
              <div className="h-px w-8 bg-burgundy" />
              <div className="h-px w-4 bg-gold" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
                MARAGONESA SILVEIRA
              </span>
            </motion.div>

            {/* Giant headline */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-sans text-4xl font-medium leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            >
              Advocacia
              <br />
              <span className="text-gold">Previdenciária</span>
              <br />
              <span className="text-white/30">que protege</span>
              <br />
              seus direitos<span className="text-burgundy">.</span>
            </motion.h1>

            <motion.div
              style={{ y: y2 }}
              className="mt-8 flex max-w-xl flex-col gap-6 sm:mt-12 sm:gap-8 lg:mt-16"
            >
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="max-w-sm text-sm leading-relaxed text-white/40 sm:max-w-md sm:text-base"
              >
                Orientação especializada e atendimento humanizado. Simplificamos cada
                etapa e garantimos que seus direitos junto ao INSS sejam respeitados.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-semibold text-white sm:px-8 sm:py-4 sm:text-[15px]"
                >
                  <WhatsAppIcon size={16} />
                  Consultar Especialista
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-4 py-3 text-[13px] font-medium text-white/40 transition-colors hover:text-white/80"
                >
                  <span className="h-px w-6 bg-white/20" />
                  Explorar serviços
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ y: imgY }}
            className="relative hidden lg:block"
          >
            {/* Accent frame */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-burgundy/20 via-transparent to-gold/10" />
            <div className="absolute -top-2 -left-2 h-16 w-px bg-burgundy/60" />
            <div className="absolute -top-2 -left-2 h-px w-16 bg-burgundy/60" />
            <div className="absolute -bottom-2 -right-2 h-16 w-px bg-gold/40" />
            <div className="absolute -bottom-2 -right-2 h-px w-16 bg-gold/40" />

            <img
              src={capa}
              alt="Advocacia Previdenciária — Maragonesa Silveira"
              className="relative max-h-[550px] w-full rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.5)] xl:max-h-[650px]"
            />

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-charcoal/90 px-5 py-3 backdrop-blur-lg">
              <p className="text-[10px] font-semibold tracking-wider text-gold/70">
                ESPECIALISTA
              </p>
              <p className="text-sm font-bold text-white">Direito Previdenciário</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-6 right-6 sm:bottom-10 lg:left-10 lg:right-10"
        >
          <div className="flex items-center gap-12 border-t border-white/[0.06] pt-6">
            {[
              // { value: '8', label: 'Serviços' },
              // { value: '5+', label: 'Anos' },
              // { value: 'INSS', label: 'Especialistas' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="font-sans text-2xl font-bold text-white/80 lg:text-3xl">
                  {stat.value}
                </span>
                <span className="text-[11px] tracking-wider text-white/30">
                  {stat.label}
                </span>
                {i < 2 && (
                  <span className="ml-8 hidden h-4 w-px bg-burgundy/30 sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
