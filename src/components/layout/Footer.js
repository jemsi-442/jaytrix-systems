import { profile, navLinks } from "@/lib/data";
import { JayTrixMarkIcon, MailIcon, WhatsAppIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="bg-[#071b3b] pb-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_0.7fr_1fr] lg:px-8">
        <div>
          <a href="#hero" className="inline-flex items-center gap-3" aria-label="JAYTRIX SYSTEMS home">
            <JayTrixMarkIcon size={44} />
            <span><span className="block text-lg font-extrabold tracking-[0.14em]">JAYTRIX</span><span className="block text-[10px] font-semibold tracking-[0.42em] text-blue-100/70">SYSTEMS</span></span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-100/70">{profile.tagline}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Technology · Innovation · Excellence</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Explore</h2>
          <nav className="mt-4 grid gap-3">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="text-sm text-blue-100/70 transition hover:text-white">{link.label}</a>)}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Talk to our team</h2>
          <p className="mt-4 text-sm text-blue-100/70">Have a project or need technical support? We’re ready to hear about it.</p>
          <div className="mt-4 grid gap-3">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-sm text-blue-100/80 transition hover:text-white"><MailIcon size={17} />{profile.email}</a>
            <a href={profile.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm text-blue-100/80 transition hover:text-white"><WhatsAppIcon size={17} />Chat on WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-blue-100/50 sm:px-6 lg:px-8">© {new Date().getFullYear()} JAYTRIX SYSTEMS. All rights reserved.</p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#071b3b] text-white shadow-[0_-8px_30px_rgba(7,27,59,0.18)]">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Need a technology partner?</p>
            <p className="text-xs text-blue-100/65">Talk with JAYTRIX SYSTEMS</p>
          </div>
          <span className="text-[10px] font-extrabold leading-tight tracking-[0.12em] sm:hidden">JAYTRIX<br />SYSTEMS</span>
          <div className="ml-auto flex items-center gap-2">
            <a href={`mailto:${profile.email}`} aria-label="Email JAYTRIX SYSTEMS" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-3 text-sm font-semibold text-blue-50 transition hover:border-cyan-200/40 hover:text-cyan-100 sm:px-4">
              <MailIcon size={17} /><span className="hidden sm:inline">Email us</span>
            </a>
            <a href={profile.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with JAYTRIX SYSTEMS on WhatsApp" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-3 text-sm font-semibold text-white transition hover:bg-accent-dark sm:px-4">
              <WhatsAppIcon size={18} /><span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
