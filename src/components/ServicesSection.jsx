import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import logoCompleta from '../assets/images/logo_completo_branco.png'

const services = [
  { icon: 'request_quote', title: 'Aposentadorias', description: 'Aposentadoria por tempo de contribuição, por idade, com tempo rural e especial. Concessão do benefício e revisão do valor.' },
  { icon: 'personal_injury', title: 'Auxílio-Doença', description: 'Impossibilitado de trabalhar em razão da doença, pode ter direito ao auxílio por incapacidade temporária ou permanente.' },
  { icon: 'accessible_forward', title: 'Auxílio-Acidente', description: 'Benefício pago ao segurado que sofreu um acidente e ficou com sequelas que reduzem sua capacidade de trabalho.' },
  { icon: 'paid', title: 'Isenção do IR', description: 'Isenção de imposto de renda por doenças graves, como neoplasia maligna, cardiopatia grave, alienação mental e outros.' },
  { icon: 'elderly_woman', title: 'LOAS (BPC)', description: 'Benefício assistencial para deficiente ou idoso em situação de baixa renda.' },
  { icon: 'home_work', title: 'Quitação de Imóvel', description: 'Análise do contrato para possibilidade de quitação do imóvel diante da invalidez ou morte do contratante.' },
  { icon: 'group', title: 'Pensão por Morte', description: 'Benefício pago aos dependentes do segurado falecido. Revisão de valores e cotas.' },
  { icon: 'add_circle', title: 'Adicional de 25%', description: 'Valor adicional para aposentados por invalidez que necessitam de cuidados de outra pessoa.' },
]

function BentoCard({ service, index, large, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-charcoal-mid p-5 sm:p-7 transition-all duration-500 hover:border-burgundy/20 hover:bg-charcoal-light ${
        large ? 'row-span-2 flex flex-col justify-between' : ''
      }`}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-burgundy/[0.06] blur-3xl" />
      </div>

      {/* Background number */}
      <span className="pointer-events-none absolute right-4 bottom-2 select-none font-serif text-7xl font-bold leading-none text-white/[0.02] transition-colors duration-500 group-hover:text-gold/[0.05]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 group-hover:border-gold/20 group-hover:bg-gold/10">
          <i className="material-icons-outlined text-white/40 transition-colors duration-300 group-hover:text-gold text-xl">
            {service.icon}
          </i>
        </div>
        <h3 className="text-lg font-semibold text-white/90">{service.title}</h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-white/30 transition-colors duration-300 group-hover:text-white/50 ${
            large ? '' : 'line-clamp-3'
          }`}
        >
          {service.description}
        </p>
      </div>

      {large && (
        <div className="relative mt-8 flex items-center gap-2 text-[12px] font-medium text-gold/60 transition-colors group-hover:text-gold">
          <span className="h-px w-4 bg-current" />
          Serviço principal
        </div>
      )}
    </motion.div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="grain relative overflow-hidden bg-charcoal py-20 sm:py-28 lg:py-44"
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
            className="w-460 max-w-none opacity-[0.02]"
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
              <div className="h-px w-12 bg-gold" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
                NOSSOS SERVIÇOS
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Expertise onde
              <br />
              <span className="text-white/30">você mais precisa</span>
              <span className="text-gold">.</span>
            </motion.h2>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="relative z-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(160px,auto)] xl:auto-rows-[minmax(180px,auto)]">
          {/* Large featured card */}
          <BentoCard service={services[0]} index={0} large inView={inView} />

          {/* Regular cards */}
          {services.slice(1, 3).map((service, i) => (
            <BentoCard key={service.title} service={service} index={i + 1} inView={inView} />
          ))}

          {/* Remaining cards */}
          {services.slice(3).map((service, i) => (
            <BentoCard key={service.title} service={service} index={i + 3} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
