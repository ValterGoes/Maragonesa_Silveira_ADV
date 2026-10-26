import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const languages = [
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = languages.find((l) => i18n.language?.startsWith(l.code)) || languages[0]

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function changeLanguage(code) {
    i18n.changeLanguage(code)
    document.documentElement.lang = code === 'pt' ? 'pt-BR' : code
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-navy/10 bg-white/100 px-2.5 py-1.5 text-[12px] font-medium text-navy transition-all duration-200 hover:border-navy/20 hover:bg-white hover:text-navy"
        aria-label={current.label}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[100px] overflow-hidden rounded-xl border border-navy/10 bg-cream/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[12px] font-medium transition-all duration-150 ${
                  current.code === lang.code
                    ? 'bg-white text-navy'
                    : 'text-navy/70 hover:bg-white/60 hover:text-navy'
                }`}
              >
                <span className="text-sm leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
