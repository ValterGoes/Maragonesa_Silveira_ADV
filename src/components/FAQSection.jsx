import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Users, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const categoryIcons = {
  "auxilio-doenca": Activity,
  "auxilio-acidente": ShieldCheck,
  aposentadorias: Users,
  "pensao-por-morte": Users,
  "bpc-loas": ShieldCheck,
};

function FAQCardInline({
  cat,
  catIdx,
  openKey,
  toggleAccordion,
  auxilioAcidenteLandingPageLink,
  auxilioDoencaLandingPageLink,
  buildBenefitWhatsAppLink,
  t,
}) {
  const isActiveCategory =
    openKey !== null && String(openKey).startsWith(`${catIdx}-`);
  const landingPageLink =
    cat.id === "auxilio-acidente"
      ? auxilioAcidenteLandingPageLink
      : cat.id === "auxilio-doenca"
        ? auxilioDoencaLandingPageLink
        : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: catIdx * 0.08 }}
      className={`group flex h-full flex-col rounded-[28px] border p-5 shadow-sm transition-all duration-300 sm:p-6 ${
        isActiveCategory
          ? "border-gold/40 bg-gradient-to-b from-white to-[#FAF7F0] shadow-[0_12px_30px_rgba(22,35,51,0.08)]"
          : "border-[#EDE8DF] bg-white shadow-[0_10px_24px_rgba(22,35,51,0.03)] hover:border-gold/25 hover:shadow-[0_14px_32px_rgba(22,35,51,0.06)]"
      }`}
    >
      <div className="mb-5 border-b border-[#EFE9E0] pb-4 text-center">
        <h3 className="font-sans text-lg font-semibold text-navy sm:text-xl">{cat.title}</h3>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/90">{cat.subtitle}</span>
      </div>

      <div className="flex-1 space-y-3">
        {cat.questions.map((item, qIdx) => {
          const itemKey = `${catIdx}-${qIdx}`;
          const isOpen = openKey === itemKey;

          return (
            <div key={qIdx} className="relative overflow-visible rounded-2xl border border-[#EFE9E0] bg-[#F7F5F1]">
              <button
                onClick={() => toggleAccordion(itemKey)}
                className="relative z-10 flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left text-sm font-semibold text-navy transition-colors duration-200 hover:text-gold focus:outline-none sm:px-4"
              >
                <span className="pr-2 leading-relaxed">{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 right-0 top-full z-20 pt-2"
                  >
                    <div className="rounded-xl border border-[#EFE9E0] bg-white/95 px-3.5 pb-3.5 pt-2 text-sm leading-relaxed text-navy/80 shadow-[0_14px_28px_rgba(22,35,51,0.10)] backdrop-blur-sm sm:px-4">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {landingPageLink ? (
        <a href={landingPageLink} target="_blank" rel="noopener noreferrer" aria-label={`Saiba mais sobre ${cat.title.toLowerCase()}`} className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-[#d9b15d]">Saiba mais</a>
      ) : (
        <a href={buildBenefitWhatsAppLink(cat.title)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-[#d9b15d]">Faça uma análise</a>
      )}
    </motion.article>
  );
}

export default function FAQSection() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(null);
  const whatsappNumber = "5551996839890";

  const buildBenefitWhatsAppLink = (benefitName, customMessage = null) => {
    const message =
      customMessage || `Olá! Gostaria de saber mais sobre o benefício de ${benefitName}.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const auxilioAcidenteLandingPageLink = "https://auxilioacidente.maragonesa.adv.br/";
  const auxilioDoencaLandingPageLink = "https://auxiliodoenca.maragonesa.adv.br/";

  const faqCategories = (t("faq.categories", { returnObjects: true }) || []).map(
    (category) => ({
      ...category,
      icon: categoryIcons[category.id] || Activity,
    }),
  );

  const toggleAccordion = (key) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key));
  };

  return (
    <section className="relative overflow-visible bg-offwhite py-14 lg:py-18">
      {/* texto de fundo da seção */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center xl:pt-22 2xl:pt-26">
        {t("faq.bgText")
          .split(" ")
          .map((word, i) => (
            <span
              key={i}
              className="block font-serif text-[10rem] font-bold leading-[0.85] text-navy/[0.02] sm:text-[16rem] md:text-[18rem] lg:text-[24rem] xl:text-[24rem] 2xl:text-[32rem]"
            >
              {word}
            </span>
          ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 2xl:max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-4 md:mb-8"
        >
          <div className="h-px w-8 bg-burgundy" />
          <div className="h-px w-12 bg-gold" />
          <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
            {t("faq.eyebrow")}
          </span>
        </motion.div>

        <div className="hidden xl:grid xl:grid-cols-3 xl:gap-6">
          <div className="xl:col-span-1 xl:flex xl:items-center xl:justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-0 max-w-full text-center font-sans text-[4rem] font-medium leading-[1.02] tracking-tight text-navy"
            >
              {t("faq.title1")}
              <br />
              <span className="text-navy/30">{t("faq.title2")}</span>
              <span className="text-gold">.</span>
            </motion.h2>
          </div>

          {faqCategories.slice(0, 2).map((cat, idx) => (
            <div key={cat.id} className="xl:col-span-1">
              <FAQCardInline
                cat={cat}
                catIdx={idx}
                openKey={openKey}
                toggleAccordion={toggleAccordion}
                auxilioAcidenteLandingPageLink={auxilioAcidenteLandingPageLink}
                auxilioDoencaLandingPageLink={auxilioDoencaLandingPageLink}
                buildBenefitWhatsAppLink={buildBenefitWhatsAppLink}
                t={t}
              />
            </div>
          ))}

          <div className="xl:col-span-3 xl:grid xl:grid-cols-3 xl:gap-6">
            {faqCategories.slice(2).map((cat, idx) => (
              <div key={cat.id} className="xl:col-span-1">
                <FAQCardInline
                  cat={cat}
                  catIdx={idx + 2}
                  openKey={openKey}
                  toggleAccordion={toggleAccordion}
                  auxilioAcidenteLandingPageLink={
                    auxilioAcidenteLandingPageLink
                  }
                  auxilioDoencaLandingPageLink={auxilioDoencaLandingPageLink}
                  buildBenefitWhatsAppLink={buildBenefitWhatsAppLink}
                  t={t}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:hidden">
          {faqCategories.map((cat, catIdx) => {
            const isActiveCategory =
              openKey !== null && String(openKey).startsWith(`${catIdx}-`);

            return (
              <motion.article
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                className={`group flex flex-col rounded-[28px] border p-5 shadow-sm transition-all duration-300 sm:p-6 ${
                  isActiveCategory
                    ? "border-gold/40 bg-gradient-to-b from-white to-[#FAF7F0] shadow-[0_12px_30px_rgba(22,35,51,0.08)]"
                    : "border-[#EDE8DF] bg-white shadow-[0_10px_24px_rgba(22,35,51,0.03)] hover:border-gold/25 hover:shadow-[0_14px_32px_rgba(22,35,51,0.06)]"
                }`}
              >
                <div className="mb-5 border-b border-[#EFE9E0] pb-4 text-center">
                  <h3 className="font-sans text-lg font-semibold text-navy sm:text-xl">
                    {cat.title}
                  </h3>
                  <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/90">
                    {cat.subtitle}
                  </span>
                </div>

                <div className="flex-1 space-y-3">
                  {cat.questions.map((item, qIdx) => {
                    const itemKey = `${catIdx}-${qIdx}`;
                    const isOpen = openKey === itemKey;

                    return (
                      <div
                        key={qIdx}
                        className="overflow-hidden rounded-2xl border border-[#EFE9E0] bg-[#F7F5F1]"
                      >
                        <button
                          onClick={() => toggleAccordion(itemKey)}
                          className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left text-sm font-semibold text-navy transition-colors duration-200 hover:text-gold focus:outline-none sm:px-4"
                        >
                          <span className="pr-2 leading-relaxed">{item.q}</span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <div className="border-t border-[#EAE3D8] px-3.5 pb-3.5 pt-2 text-sm leading-relaxed text-navy sm:px-4">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {cat.id === "auxilio-acidente" || cat.id === "auxilio-doenca" ? (
                  <a
                    href={
                      cat.id === "auxilio-acidente"
                        ? auxilioAcidenteLandingPageLink
                        : auxilioDoencaLandingPageLink
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Saiba mais sobre ${cat.title.toLowerCase()}`}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-[#d9b15d]"
                  >
                    Saiba mais
                  </a>
                ) : (
                  <a
                    href={buildBenefitWhatsAppLink(cat.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-[#d9b15d]"
                  >
                    Faça uma análise
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
} 