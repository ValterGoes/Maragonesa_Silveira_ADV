import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import advImg from "../assets/images/adv3.webp";
import adv2 from "../assets/images/adv2.webp";

export default function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-20 sm:py-32 lg:py-20"
    >
      {/* Large background text */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none flex flex-col items-center justify-center text-center 2xl:pt-30"
      >
        {t("about.bgText")
          .split(" ")
          .map((word, i) => (
            <span
              key={i}
              className="block font-serif text-[10rem] font-bold leading-[0.85] text-navy/3 sm:text-[16rem] md:text-[20rem] xl:text-[26rem] 2xl:text-[32rem]"
            >
              {word}
            </span>
          ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 2xl:max-w-[1400px]">
        {/* ================= BLOCO SUPERIOR: TEXTOS EM LARGURA TOTAL ================= */}
        <div className="flex flex-col mb-16 lg:mb-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-px w-8 bg-burgundy" />
            <div className="h-px w-4 bg-gold" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
              {t("about.eyebrow")}
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-3xl font-medium leading-[1.1] tracking-tight text-navy sm:text-4xl xl:text-5xl 2xl:text-6xl"
          >
            {t("about.title1")}
            <br />
            <span className="text-gold">{t("about.title2")}</span>
            <br />
            <span className="text-navy/30">{t("about.title3")}</span>
            <span className="text-burgundy">.</span>
          </motion.h2>

          {/* Descrição - Ajustada com w-full para ocupar toda a largura útil da página */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 w-full"
          >
            <p
              className="text-sm leading-relaxed text-gray-text sm:text-base sm:leading-[1.8] xl:text-lg w-full"
              dangerouslySetInnerHTML={{ __html: t("about.description") }}
            />
          </motion.div>
        </div>

        {/* ================= BLOCO INFERIOR: IMAGENS LADO A LADO (CENTRALIZADAS) ================= */}
        {/* Adicionado justify-items-center para alinhar os eixos das colunas */}
        <div className="grid gap-12 sm:gap-16 grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:gap-16 justify-items-center">
          {/* Imagem 1 — Maragonesa da Silveira */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[450px] sm:h-[500px] lg:h-[530px] xl:h-[550px] w-full max-w-[450px] mx-auto"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-burgundy/15 via-transparent to-gold/10" />
            <img
              src={advImg}
              alt={t("about.imgAlt")}
              className="relative h-full w-full rounded-2xl object-cover object-top shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:scale-[1.01]"
            />
            {/* Detalhe linear superior esquerdo */}
            <div className="absolute -top-3 -left-3 h-12 w-px bg-burgundy/50" />
            <div className="absolute -top-3 -left-3 h-px w-12 bg-burgundy/50" />

            {/* Badge de Identificação */}
            <div className="absolute -bottom-4 left-6 z-20 rounded-xl border border-navy/5 bg-cream/95 px-5 py-3 shadow-md shadow-navy/5 backdrop-blur-md sm:left-8">
              <p className="font-sans text-base font-bold text-navy whitespace-nowrap">
                {t("about.lawyer1Name", "Maragonesa da Silveira")}
              </p>
              <p className="text-[11px] font-semibold tracking-wider text-gold uppercase mt-0.5 whitespace-nowrap">
                {t("about.lawyer1Oab", "ADVOGADA - OAB/RS 124.645")}
              </p>
            </div>
          </motion.div>

          {/* Imagem 2 — Luciana Seixas Alves Teixeira */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[450px] sm:h-[500px] lg:h-[530px] xl:h-[550px] w-full max-w-[450px] mx-auto"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold/10 via-transparent to-burgundy/15" />
            <img
              src={adv2}
              alt="Advogada Associada"
              className="relative h-full w-full rounded-2xl object-cover object-top shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:scale-[1.01]"
            />
            {/* Detalhe linear inferior direito */}
            <div className="absolute -bottom-3 -right-3 h-12 w-px bg-gold/50" />
            <div className="absolute -bottom-3 -right-3 h-px w-12 bg-gold/50" />

            {/* Badge de Identificação */}
            <div className="absolute -bottom-4 right-6 z-20 rounded-xl border border-navy/5 bg-cream/95 px-5 py-3 shadow-md shadow-navy/5 backdrop-blur-md sm:right-8">
              <p className="font-sans text-base font-bold text-navy whitespace-nowrap">
                {t("about.lawyer2Name", "Luciana Seixas Alves Teixeira")}
              </p>
              <p className="text-[11px] font-semibold tracking-wider text-gold uppercase mt-0.5 whitespace-nowrap">
                {t("about.lawyer2Oab", "ADVOGADA - OAB/SP 494.240")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
