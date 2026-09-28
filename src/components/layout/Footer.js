import { profile, navLinks } from "@/lib/data";
import Button from "@/components/ui/Button";
import {
  GithubIcon,
  JayTrixMarkIcon,
  LinkedinIcon,
  MailIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              className="group inline-flex items-center gap-3 transition-colors duration-300"
              aria-label={profile.name}
            >
              <JayTrixMarkIcon
                size={44}
                className="shrink-0 drop-shadow-[0_10px_18px_rgba(7,58,133,0.16)] transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span className="leading-none">
                <span className="block text-lg font-extrabold tracking-[0.14em] text-accent">
                  JAYTRIX
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.42em] text-foreground">
                  SYSTEMS
                </span>
              </span>
            </a>
            <p className="mt-3 text-foreground-secondary text-sm leading-relaxed max-w-xs">
              {profile.tagline}
            </p>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              Technology | Innovation | Excellence
            </p>
            <div className="mt-5">
              <Button href="#projects" size="sm">
                Explore Our Work
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground-secondary hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full text-foreground-secondary hover:text-accent hover:bg-surface transition-all duration-200"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full text-foreground-secondary hover:text-accent hover:bg-surface transition-all duration-200"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full text-foreground-secondary hover:text-accent hover:bg-surface transition-all duration-200"
              >
                <YouTubeIcon size={22} />
              </a>
              <a
                href={profile.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 rounded-full text-foreground-secondary hover:text-[#25D366] hover:bg-surface transition-all duration-200"
              >
                <WhatsAppIcon size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="p-2 rounded-full text-foreground-secondary hover:text-accent hover:bg-surface transition-all duration-200"
              >
                <MailIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex items-center justify-center">
          <p className="text-sm text-foreground-muted">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            {profile.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
