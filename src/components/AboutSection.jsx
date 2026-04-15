import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import advImg from '../assets/images/adv3.webp'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-20 sm:py-28 lg:py-44"
    >
      {/* Large background text */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-serif text-[16rem] font-bold leading-none text-navy/[0.03] sm:text-[26rem] lg:text-[50rem]">
          Sobre
        </span>
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
                alt="Maragonesa Silveira — Advogada Previdenciária em Porto Alegre"
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
                SOBRE NÓS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-3xl font-medium leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Especialização
              <br />
              <span className="text-gold">& empatia</span>
              <br />
              <span className="text-navy/30">em cada caso</span>
              <span className="text-burgundy">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base leading-relaxed text-gray-text sm:mt-8 sm:text-lg sm:leading-[1.8]"
            >
              Somos especialistas em{" "}
              <strong className="font-semibold text-navy">
                direito previdenciário junto ao INSS
              </strong>
              . Nossa equipe conhece profundamente as regras previdenciárias e
              luta incansavelmente pelos direitos dos nossos clientes.
              Acreditamos que a advocacia de excelência nasce quando o
              conhecimento técnico se encontra com a empatia genuína.
            </motion.p>
          </div>
        </div>

        {/* Value cards — full width below the 2-col grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-md:grid-cols-1"
        >
          {[
            {
              n: "01",
              label: "Atendimento Nacional",
              sub: "Presencial em Porto Alegre ou 100% online para todo o Brasil.",
            },
            {
              n: "02",
              label: "Atendimento Personalizado",
              sub: "Cada caso é único. Estratégias sob medida focadas em você.",
            },
            {
              n: "03",
              label: "Processos Eletrônicos",
              sub: "Resolva tudo com praticidade e segurança, sem sair de casa.",
            },
          ].map(({ n, label, sub }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="group relative flex-1 overflow-hidden rounded-2xl border border-gray-border bg-white p-6 transition-all duration-300 hover:border-burgundy/20 hover:shadow-[0_8px_30px_rgba(74,111,165,0.06)]"
            >
              <span className="absolute -right-2 -top-4 font-serif text-6xl font-bold text-burgundy/[0.04] transition-colors group-hover:text-burgundy/[0.08]">
                {n}
              </span>
              <p className="relative text-sm font-semibold text-navy">
                {label}
              </p>
              <p className="relative mt-2 text-xs leading-relaxed text-gray-text">
                {sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-sm leading-relaxed text-gray-text"
        >
          Localizados na{" "}
          <strong className="text-navy">
            Av. Praia de Belas, nº 1212 sala 424 — Porto Alegre, RS
          </strong>
          , atendemos clientes de todo o Brasil com compromisso, transparência e
          resultados.
        </motion.p>
      </div>
    </section>
  );
}
