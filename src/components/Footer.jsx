import { useTranslation } from 'react-i18next'
import WhatsAppIcon from './WhatsAppIcon'
import logoBranco from '../assets/images/logo_branco.png'
import logo from '../assets/images/logo-valtergoes.svg'

const WHATSAPP_BASE = 'https://wa.me/5551996839890?text='

const socialLinks = [
  { icon: 'linkedin', href: 'https://www.linkedin.com/in/maragonesa-silveira', label: 'LinkedIn', hoverColor: 'hover:border-[#0A66C2]/30 hover:text-[#0A66C2]' },
  { icon: 'instagram', href: 'https://www.instagram.com/maragonesa', label: 'Instagram', hoverColor: 'hover:border-[#E1306C]/30', gradient: true },
  { icon: 'facebook', href: 'https://web.facebook.com/MaragonesaSilveira', label: 'Facebook', hoverColor: 'hover:border-[#1877F2]/30 hover:text-[#1877F2]' },
  { icon: 'youtube', href: 'https://www.youtube.com/@maragonesaSilveira', label: 'YouTube', hoverColor: 'hover:border-[#FF0000]/30 hover:text-[#FF0000]' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const whatsappUrl = WHATSAPP_BASE + encodeURIComponent(t('hero.whatsappMsg'))

  return (
    <footer className="grain relative overflow-hidden bg-charcoal">
      {/* Top CTA band */}
      <div className="border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row sm:py-16 lg:px-10 2xl:max-w-[1400px]">
          <div>
            <h3 className="font-sans text-xl font-medium text-white sm:text-2xl lg:text-3xl">
              {t('footer.ctaTitle')}<span className="text-burgundy">.</span>
            </h3>
            <p className="mt-1 text-sm text-white/30">
              {t('footer.ctaSubtitle')}
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white sm:px-8 sm:py-4"
          >
            <WhatsAppIcon size={20} />
            {t('footer.ctaButton')}
          </a>
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 2xl:max-w-[1400px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex items-start gap-4">
            <a href="#hero">
              <img
                src={logoBranco}
                alt="Maragonesa Silveira Advocacia Previdenciária"
                className="h-16 w-auto opacity-70 transition-opacity hover:opacity-100"
              />
            </a>
            <div>
              <p className="max-w-xs text-xs leading-relaxed text-white/40">
                {t('footer.brandDescription')}
              </p>
              <p className="mt-2 text-[10px] font-semibold tracking-wider text-gold/60">
                OAB/RS: 17.398
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/30 transition-all duration-300 ${link.hoverColor} ${link.gradient ? '' : ''}`}
                  aria-label={link.label}
                >
                  {link.gradient ? (
                    <i
                      className={`bi bi-${link.icon} text-base transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#833ab4] group-hover:bg-clip-text group-hover:text-transparent`}
                    />
                  ) : (
                    <i className={`bi bi-${link.icon} text-base`} />
                  )}
                </a>
              ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-white/[0.04] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/35">
            &copy; {year} {t('footer.copyright')}
          </p>

          <a
            href="https://valtergoes.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-white/35 transition-colors hover:text-white/40"
          >
            {t('footer.developedBy')} <img src={logo} alt="Valter Goes" className="h-8 w-20" />
          </a>

        </div>
      </div>
    </footer>
  )
}
