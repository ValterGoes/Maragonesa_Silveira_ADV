import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Clock,
  Globe,
  ArrowUpRight,
  Navigation,
  Mail,
} from "lucide-react";

const WHATSAPP_BASE =
  "https://wa.me/5551996839890?text=";

const locations = {
  poa: {
    lat: -30.0473,
    lng: -51.2278,
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.4!2d-51.2278!3d-30.0473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdf60e8d0e3dff5f8!2sAv.+Praia+de+Belas%2C+1212+-+Praia+de+Belas%2C+Porto+Alegre+-+RS!5e0!3m2!1spt-BR!2sbr!4v1",
    mapsUrl: "https://maps.google.com/?cid=16087064335138607864",
  },
  bc: {
    lat: -26.9906,
    lng: -48.6348,
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.8!2d-48.6348!3d-26.9906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sR.+55%2C+50+-+Centro%2C+Balne%C3%A1rio+Cambori%C3%BA+-+SC!5e0!3m2!1spt-BR!2sbr!4v1",
    mapsUrl: "https://www.google.com/maps/search/R.+55,+50+-+Centro,+Balne%C3%A1rio+Cambori%C3%BA+-+SC",
  },
};

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getClosestOffice(userLat, userLng) {
  const distPoa = getDistance(userLat, userLng, locations.poa.lat, locations.poa.lng);
  const distBc = getDistance(userLat, userLng, locations.bc.lat, locations.bc.lng);
  return distBc < distPoa ? "bc" : "poa";
}

export default function ContactSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeLocation, setActiveLocation] = useState("poa");

  const whatsappUrl = WHATSAPP_BASE + encodeURIComponent(t('hero.whatsappMsg'));
  const current = locations[activeLocation];

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.latitude && data.longitude) {
          setActiveLocation(getClosestOffice(data.latitude, data.longitude));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 2xl:max-w-[1400px]" ref={ref}>
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {/* Left — info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-px w-8 bg-burgundy" />
              <div className="h-px w-4 bg-gold" />
              <span className="text-[11px] font-semibold tracking-[0.3em] text-gold">
                {t('contact.eyebrow')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-10 font-sans text-3xl font-medium leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              {t('contact.title1')}
              <br />
              <span className="text-navy/30">{t('contact.title2')}</span>
              <span className="text-burgundy">.</span>
            </motion.h2>

            {/* WhatsApp card */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="group flex items-center gap-4 rounded-xl border border-gray-border bg-white p-4 transition-all duration-300 hover:border-[#25D366]/30 hover:shadow-[0_4px_20px_rgba(37,211,102,0.08)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 transition-colors duration-300 group-hover:bg-[#25D366]/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="#25D366"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{t('contact.whatsapp')}</p>
                <p className="text-sm text-gray-text">(51) 9683-9890</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-text/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#25D366]"
              />
            </motion.a>

            {/* Email card */}
            <motion.a
              href="mailto:maragonesa.adv@gmail.com"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="group mt-3 flex items-center gap-4 rounded-xl border border-gray-border bg-white p-4 transition-all duration-300 hover:border-burgundy/20 hover:shadow-[0_4px_20px_rgba(74,111,165,0.08)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-burgundy/10 transition-colors duration-300 group-hover:bg-burgundy/20">
                <Mail size={20} className="text-burgundy" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{t('contact.email')}</p>
                <p className="text-sm text-gray-text">
                  maragonesa.adv@gmail.com
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-text/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-burgundy"
              />
            </motion.a>

            {/* Instagram card */}
            <motion.a
              href="https://www.instagram.com/maragonesa"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="group mt-3 flex items-center gap-4 rounded-xl border border-gray-border bg-white p-4 transition-all duration-300 hover:border-[#E1306C]/30 hover:shadow-[0_4px_20px_rgba(225,48,108,0.08)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E1306C]/10 transition-colors duration-300 group-hover:bg-[#E1306C]/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="#E1306C"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{t('contact.instagram')}</p>
                <p className="text-sm text-gray-text">@maragonesa</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-text/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E1306C]"
              />
            </motion.a>

            {/* Address + hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 space-y-2"
            >
              <button
                type="button"
                onClick={() => setActiveLocation("poa")}
                className={`flex w-full items-start gap-4 rounded-xl p-3 text-left transition-all duration-300 ${
                  activeLocation === "poa"
                    ? "border border-burgundy/20 bg-white shadow-[0_4px_20px_rgba(74,111,165,0.06)]"
                    : "border border-transparent hover:bg-white/60"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                  activeLocation === "poa"
                    ? "border-burgundy/20 bg-burgundy/10"
                    : "border-gray-border bg-white"
                }`}>
                  <MapPin size={16} className="text-burgundy" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-navy/40">
                    {t('contact.addressLabel')}
                  </p>
                  <p className="text-sm font-medium text-navy">
                    {t('contact.addressLine1')}
                    <br />
                    {t('contact.addressLine2')}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveLocation("bc")}
                className={`flex w-full items-start gap-4 rounded-xl p-3 text-left transition-all duration-300 ${
                  activeLocation === "bc"
                    ? "border border-burgundy/20 bg-white shadow-[0_4px_20px_rgba(74,111,165,0.06)]"
                    : "border border-transparent hover:bg-white/60"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                  activeLocation === "bc"
                    ? "border-burgundy/20 bg-burgundy/10"
                    : "border-gray-border bg-white"
                }`}>
                  <MapPin size={16} className="text-burgundy" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-navy/40">
                    {t('contact.address2Label')}
                  </p>
                  <p className="text-sm font-medium text-navy">
                    {t('contact.address2Line1')}
                    <br />
                    {t('contact.address2Line2')}
                  </p>
                </div>
              </button>

              <div className="flex items-start gap-4 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-border bg-white">
                  <Globe size={16} className="text-burgundy" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-navy/40">
                    {t('contact.onlineLabel')}
                  </p>
                  <p className="text-sm font-medium text-navy">
                    {t('contact.onlineText')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-border bg-white">
                  <Clock size={16} className="text-burgundy" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-navy/40">
                    {t('contact.hoursLabel')}
                  </p>
                  <p className="text-sm font-medium text-navy">
                    {t('contact.hoursText')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            {/* Map */}
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <iframe
                title={t('contact.mapTitle')}
                src={current.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 200 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="sm:min-h-[200px] lg:min-h-[240px]"
              />
              {/* Floating badge */}
              <a
                href={current.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-xl"
              >
                <Navigation size={14} className="text-burgundy" />
                <span className="text-xs font-semibold text-navy">
                  {t('contact.openMaps')}
                </span>
                <ArrowUpRight
                  size={12}
                  className="text-navy/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-burgundy"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
