import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// 🟢 VÍDEOS DE FALLBACK (Garantia de exibição se a requisição falhar)
const DEFAULT_VIDEOS = [
  {
    id: "6HfAJsTnrZo",
    title: "Sofreu um acidente? Saiba se você tem direito ao auxílio-acidente.",
    thumb: "https://img.youtube.com/vi/6HfAJsTnrZo/maxresdefault.jpg",
    fallbackThumb: "https://img.youtube.com/vi/6HfAJsTnrZo/hqdefault.jpg",
  },
  {
    id: "BpfgHP6Zf8s",
    title:
      "Preciso estar afastado do trabalho para receber o auxílio-acidente?",
    thumb: "https://img.youtube.com/vi/BpfgHP6Zf8s/maxresdefault.jpg",
    fallbackThumb: "https://img.youtube.com/vi/BpfgHP6Zf8s/hqdefault.jpg",
  },
  {
    id: "M7Pp0rcRMXo",
    title: "Amputação de dedo ou perda de movimento dão direito ao benefício?",
    thumb: "https://img.youtube.com/vi/M7Pp0rcRMXo/maxresdefault.jpg",
    fallbackThumb: "https://img.youtube.com/vi/M7Pp0rcRMXo/hqdefault.jpg",
  },
  {
    id: "93yJS05ofQQ",
    title: "Posso pedir auxílio-acidente depois de muitos anos do ocorrido?",
    thumb: "https://img.youtube.com/vi/93yJS05ofQQ/maxresdefault.jpg",
    fallbackThumb: "https://img.youtube.com/vi/93yJS05ofQQ/hqdefault.jpg",
  },
];

function LazyVideo({
  id,
  title,
  thumb,
  fallbackThumb,
  index,
  inView,
  playLabel,
}) {
  const [playing, setPlaying] = useState(false);
  const handlePlay = useCallback(() => setPlaying(true), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="group relative flex-none w-[80vw] snap-center overflow-hidden rounded-2xl border border-gray-border bg-white shadow-none transition-all duration-300 hover:border-gold/20 sm:w-[280px] sm:hover:shadow-[0_8px_30px_rgba(197,160,89,0.08)] lg:w-[220px] xl:w-[240px]"
    >
      <div className="relative aspect-[9/16] bg-black overflow-hidden rounded-t-2xl">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
          />
        ) : (
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full cursor-pointer border-none p-0 bg-black group/btn"
            aria-label={`${playLabel}: ${title}`}
          >
            <img
              src={thumb}
              alt={title}
              loading="lazy"
              onError={(e) => {
                if (e.target.src !== fallbackThumb) {
                  e.target.src = fallbackThumb;
                }
              }}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover/btn:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover/btn:bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 opacity-70" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-18 sm:h-11 sm:w-16 items-center justify-center rounded-xl bg-[#ff0000] text-white shadow-[0_4px_15px_rgba(255,0,0,0.4)] transition-transform duration-300 group-hover/btn:scale-110">
                <Play size={28} className="fill-current ml-1" />
              </div>
            </div>

            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
              Shorts
            </div>
          </button>
        )}
      </div>

      <div className="px-3 py-4">
        <p
          className="text-[13px] leading-tight font-semibold text-navy line-clamp-2"
          title={title}
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideosSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [videos, setVideos] = useState(DEFAULT_VIDEOS);
  const [isLoading, setIsLoading] = useState(true);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        const CHANNEL_ID = "UCFerEojNj5BQK9mpwDHxzCQ";
        const PINNED_VIDEOS = [
          "6HfAJsTnrZo",
          "BpfgHP6Zf8s",
          "M7Pp0rcRMXo",
          "93yJS05ofQQ",
        ];
        const BLOCKED_VIDEOS = ["CoRkdPrZV28", "XJcIyhw6txk", "jJiHMTwG-w0"];

        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const apiEndpoint = `https://www.toptal.com/developers/feed2json/convert?url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("Falha na requisição da API");

        const data = await response.json();

        if (data && data.items && data.items.length > 0) {
          const allVideos = data.items
            .map((item) => {
              let videoId = "";
              if (item.id) {
                const parts = item.id.split(":");
                videoId = parts[parts.length - 1];
              } else if (item.url) {
                videoId = item.url.split("v=")[1]?.split("&")[0];
              }

              return {
                id: videoId,
                title: item.title,
                thumb: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                fallbackThumb: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              };
            })
            .filter((v) => v.id);

          const filteredVideos = allVideos.filter(
            (v) => !BLOCKED_VIDEOS.includes(v.id),
          );

          filteredVideos.sort((a, b) => {
            const indexA = PINNED_VIDEOS.indexOf(a.id);
            const indexB = PINNED_VIDEOS.indexOf(b.id);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
          });

          if (filteredVideos.length > 0) {
            setVideos(filteredVideos.slice(0, 6));
          }
        }
      } catch (error) {
        console.warn(
          "API indisponível. Utilizando lista de vídeos de fallback:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  const checkScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, videos]);

  const scroll = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector(":first-child");
    if (!card) return;
    const cardWidth = card.offsetWidth + 12;
    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onPointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.style.userSelect = "none";
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    carouselRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
      carouselRef.current.style.userSelect = "";
    }
  };

  return (
    <section
      id="videos"
      ref={ref}
      className="relative overflow-hidden bg-offwhite py-14 lg:py-18"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none flex flex-col items-center justify-center text-center xl:pt-30"
      >
        {t("videos.bgText")
          .split(" ")
          .map((word, i) => (
            <span
              key={i}
              className="block font-serif text-[10rem] font-bold leading-[0.85] text-navy/[0.03] sm:text-[16rem] md:text-[20rem] lg:text-[26rem] xl:text-[30rem] 2xl:text-[38rem]"
            >
              {word}
            </span>
          ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 2xl:max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="mb-6 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-gold" />
          <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
            {t("videos.eyebrow")}
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
              {t("videos.title1")}
              <br />
              <span className="text-navy/30">{t("videos.title2")}</span>
              <span className="text-gold">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-lg text-base leading-relaxed text-gray-text"
            >
              {t("videos.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="hidden md:flex lg:hidden items-center gap-2"
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 hover:shadow-md disabled:opacity-20 disabled:cursor-default"
              aria-label={t("videos.prev")}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 hover:shadow-md disabled:opacity-20 disabled:cursor-default"
              aria-label={t("videos.next")}
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        <div className="relative">
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-offwhite to-transparent transition-opacity duration-300 lg:hidden ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-offwhite to-transparent transition-opacity duration-300 lg:hidden ${canScrollRight ? "opacity-100" : "opacity-0"}`}
          />

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
            </div>
          ) : (
            <div
              ref={carouselRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className="videos-carousel flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory cursor-grab"
              style={{ paddingInline: "max(1rem, calc(50% - 150px))" }}
            >
              {videos.map((video, index) => (
                <LazyVideo
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  thumb={video.thumb}
                  fallbackThumb={video.fallbackThumb}
                  index={index}
                  inView={inView}
                  playLabel={t("videos.play")}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-4 flex md:hidden items-center justify-center gap-3"
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 disabled:opacity-20 disabled:cursor-default"
            aria-label={t("videos.prev")}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-border bg-white text-navy transition-all duration-200 hover:border-gold/30 disabled:opacity-20 disabled:cursor-default"
            aria-label={t("videos.next")}
          >
            <ChevronRight size={16} />
          </button>
        </motion.div>

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
            {t("videos.youtube")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
