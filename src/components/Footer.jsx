import { Mail } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import logoBranco from '../assets/images/logo_branco.png'
import logo from '../assets/images/logo-valtergoes.svg'

const WHATSAPP =
  'https://wa.me/5551996839890?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20meu%20benef%C3%ADcio%20previdenci%C3%A1rio.'

const socialLinks = [
  { icon: 'linkedin', href: 'https://www.linkedin.com/in/maragonesa-silveira', label: 'LinkedIn', hoverColor: 'hover:border-[#0A66C2]/30 hover:text-[#0A66C2]' },
  { icon: 'instagram', href: 'https://www.instagram.com/maragonesa', label: 'Instagram', hoverColor: 'hover:border-[#E1306C]/30', gradient: true },
  { icon: 'facebook', href: 'https://web.facebook.com/MaragonesaSilveira', label: 'Facebook', hoverColor: 'hover:border-[#1877F2]/30 hover:text-[#1877F2]' },
  { icon: 'youtube', href: 'https://www.youtube.com/@maragonesaSilveira', label: 'YouTube', hoverColor: 'hover:border-[#FF0000]/30 hover:text-[#FF0000]' },
  { icon: 'tiktok', href: 'https://www.tiktok.com/@maragonesasilveira', label: 'TikTok', hoverColor: 'hover:border-[#00f2ea]/30 hover:text-[#00f2ea]' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="grain relative overflow-hidden bg-charcoal">
      {/* Top CTA band */}
      <div className="border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row sm:py-16 lg:px-10 2xl:max-w-[1400px]">
          <div>
            <h3 className="font-sans text-xl font-medium text-white sm:text-2xl lg:text-3xl">
              Conquiste seu benefício<span className="text-burgundy">.</span>
            </h3>
            <p className="mt-1 text-sm text-white/30">
              Agende uma consulta sem compromisso.
            </p>
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-white sm:px-8 sm:py-4"
          >
            <WhatsAppIcon size={15} />
            Falar com Especialista
          </a>
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 2xl:max-w-[1400px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex items-start gap-4">
            <img
              src={logoBranco}
              alt="Maragonesa Silveira Advocacia Previdenciária"
              className="h-16 w-auto opacity-70"
            />
            <div>
              <p className="max-w-xs text-xs leading-relaxed text-white/25">
                Especialistas em Direito Previdenciário e benefícios do INSS.
                Atendimento humanizado em todo o Brasil.
              </p>
              <p className="mt-2 text-[10px] font-semibold tracking-wider text-gold/40">
                OAB/RS: 17.398
              </p>
            </div>
          </div>

          {/* Social + Contact */}
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            {/* Quick links */}
            <div className="space-y-2">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/20">CONTATO</p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/30 transition-colors hover:text-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={13} height={13} fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-[12px]">
                  <span className="font-medium text-white/40">WhatsApp</span>{' '}
                  <span className="text-white/25">(51) 9683-9890</span>
                </span>
              </a>
              <a
                href="mailto:maragonesa.adv@gmail.com"
                className="flex items-center gap-2 text-white/30 transition-colors hover:text-white/60"
              >
                <Mail size={13} />
                <span className="text-[12px] text-white/25">maragonesa.adv@gmail.com</span>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 sm:self-end">
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
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-white/[0.04] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/20">
            &copy; {year} Maragonesa Silveira — Advocacia & Consultoria
          </p>
          
          <a
            href="https://valtergoes.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-white/20 transition-colors hover:text-white/40"
          >
            Desenvolvido por <img src={logo} alt="Valter Goes" className="h-8 w-20" />
          </a>
          
        </div>
      </div>
    </footer>
  )
}
