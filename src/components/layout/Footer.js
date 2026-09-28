import { profile, navLinks } from "@/lib/data";
import { JayTrixMarkIcon, MailIcon, WhatsAppIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="bg-[#071b3b] text-white">
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
    </footer>
  );
}
