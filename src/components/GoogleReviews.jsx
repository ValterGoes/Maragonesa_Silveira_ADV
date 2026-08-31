import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";

const reviewsData = [
  {
    id: 6,
    name: "Silvia Lima",
    date: "26/04/2026",
    rating: 5.0,
    text: '"A dra Mara  É excelente, O seu atendimento é maravilhoso ,ela se preocupa com a causa de maneira humana .. e acompanha tudo de perto é com muita responsabilidade e competência, estou muito satisfeita com o seu trabalho e me sinto segura em tê-la para me representar ."',
  },
  {
    id: 5,
    name: "Mariana S.",
    date: "20/06/2026",
    rating: 5.0,
    text: '"Atendimento excelente, solucionaram meu caso com rapidez e atenção."',
  },
  {
    id: 6,
    name: "Carlos P.",
    date: "09/05/2026",
    rating: 5.0,
    text: '"Profissionalismo e transparência durante todo o processo. Recomendo."',
  },
  {
    id: 7,
    name: "Ana R.",
    date: "01/04/2026",
    rating: 4.0,
    text: '"Boa comunicação e resultado satisfatório. Apenas pequenos atrasos."',
  },
  {
    id: 1,
    name: "Lucélia Roque",
    date: "26/08/2026",
    rating: 5.0,
    text: '"Excelente profissional,muito honesta, dedicada, comprometida com o trabalho além da super gentileza e delicadeza de tratar as causas, superrr indico."',
  },
  {
    id: 2,
    name: "Hévellyn Silveira Antunes",
    date: "01/02/2026",
    rating: 5.0,
    text: '"Serviços prestados e atendimento maravilhoso, sempre atenciosa com meus casos, Maragonesa é uma excelente profissional 🤍"',
  },
  {
    id: 3,
    name: "Leide Silveira",
    date: "25/10/2025",
    rating: 5.0,
    text: '"Sempre excelente deixa tudo muitos claro explica com muita delicadeza tira todas as nossas dúvidas ."',
  },
  {
    id: 4,
    name: "Marco Severo",
    date: "25/10/2025",
    rating: 5.0,
    text: '"Excelente profissional, contratamos seus serviços e tivemos ótimos resultados. Super indico"',
  },
];

export default function GoogleReviews() {
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const sortedReviews = [...reviewsData].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");
    const [dayB, monthB, yearB] = b.date.split("/");
    
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateB - dateA; 
  });


  useEffect(() => {
    // Pausa o carrossel se o usuário estiver lendo (hover)
    if (isHovered) return;

    const timer = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        // Verifica se chegou ao final do carrossel
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          // Volta suavemente para o início
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Rola para a direita o equivalente a um card (aprox 320px)
          carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 4000); // 4000 = 4 segundos por transição

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="bg-[#FAFAFA] py-16 px-6 sm:px-10 lg:px-20 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Cabeçalho da Seção */}
        <div className="mb-10 text-left">
          <motion
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-px w-8 bg-burgundy" />
            <div className="h-px w-4 bg-gold" />
            <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
              {t("reviews.eyebrow")}
            </span>
          </motion>
          <h2 className="text-xl font-semibold text-gray-800">
            {t("reviews.title1")} {t("reviews.title2")}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{t("reviews.subtitle")}<br/>{t("reviews.subtitle2")}</p>
        </div>

        {/* Container do Carrossel */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {sortedReviews.map((review) => (
            <div
              key={review.id}
              className="flex-none w-[85vw] sm:w-[350px] flex flex-col justify-between snap-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-500/20"
            >
              <div>
                {/* Estrelas e Nota */}
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex text-[#FABB05]">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < Math.floor(review.rating)
                            ? "fill-current"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {review.rating.toFixed(1)}
                  </span>
                </div>

                {/* Texto da Avaliação */}
                <p className="text-sm text-gray-600 italic leading-relaxed whitespace-pre-wrap">
                  {review.text}
                </p>
              </div>

              {/* Nome e Data */}
              <div className="mt-6 flex items-center gap-2 text-xs">
                <span className="font-bold text-gray-900 truncate">
                  {review.name}
                </span>
                <span className="text-gray-400 flex-shrink-0">•</span>
                <span className="text-gray-500 flex-shrink-0">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
