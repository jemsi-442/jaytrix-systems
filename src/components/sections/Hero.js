import { profile, stats } from "@/lib/data";
import Button from "@/components/ui/Button";
import TechFlow from "@/components/ui/TechFlow";
import {
  GithubIcon,
  JayTrixMarkIcon,
  LinkedinIcon,
  ChevronDownIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/icons";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16 sm:pt-20"
    >
      <div className="absolute inset-0 hero-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-accent/10 via-accent/5 to-transparent" />

      <div className="absolute left-1/2 top-1/2 h-[37.5rem] w-[37.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute right-1/4 top-1/4 h-[18.75rem] w-[18.75rem] rounded-full bg-accent/5 blur-2xl animate-float" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="animate-fade-in-up mb-5 inline-flex max-w-full items-center gap-3 rounded-2xl border border-border bg-surface/70 px-3 py-2 shadow-lg shadow-accent-glow backdrop-blur-md">
              <JayTrixMarkIcon size={38} className="shrink-0" />
              <span className="min-w-0 leading-none">
                <span className="block text-sm font-extrabold tracking-[0.18em] text-accent">
                  JAYTRIX SYSTEMS
                </span>
                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground-muted sm:text-[10px] sm:tracking-[0.28em]">
                  Technology | Innovation | Excellence
                </span>
              </span>
            </div>

            <div className="animate-fade-in-up mb-4 text-[11px] font-mono uppercase tracking-[0.28em] text-foreground-muted sm:text-xs">
              Technology services for businesses and organizations
            </div>

            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-accent md:text-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
                {profile.title}
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 mt-5 max-w-4xl">
              <span className="block text-[2.5rem] font-bold leading-[0.95] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Technology for
              </span>
              <span className="mt-2 block text-[2.5rem] font-bold leading-[0.95] text-accent sm:text-5xl md:text-6xl lg:text-7xl">
                Smarter Business
              </span>
            </h1>

            <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-base leading-relaxed text-foreground-secondary md:text-lg">
              {profile.tagline}
            </p>

            <p className="animate-fade-in-up delay-300 mt-4 max-w-xl text-sm leading-relaxed text-foreground-muted md:text-base">
              From custom business software and mobile apps to Linux administration, IT support, and cybersecurity, we deliver technology shaped around your needs.
            </p>

            <div className="animate-fade-in-up delay-350 mt-6 flex flex-wrap gap-2.5">
              {profile.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-foreground-secondary backdrop-blur-md sm:text-sm"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="animate-fade-in-up delay-400 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href="#projects" size="lg" className="w-full sm:w-auto">
                Explore Our Work
              </Button>
              <Button
                href="#contact"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Talk to Our Team
              </Button>
            </div>

            <div className="animate-fade-in-up delay-450 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-accent/15 bg-accent/8 px-4 py-4">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                  Availability
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {profile.availability}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface/50 px-4 py-4">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground-muted">
                  Response
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {profile.responseTime}
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up delay-500 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface/60 px-4 py-4 backdrop-blur-md"
                >
                  <div className="text-xl font-bold text-accent md:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-foreground-muted md:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-fade-in-up delay-500 mt-8 flex flex-wrap items-center gap-4 border-t border-border/80 pt-6">
              <span className="text-sm text-foreground-muted">Connect</span>
              <div className="h-px w-8 bg-border" />

              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 text-foreground-secondary transition-colors duration-200 hover:text-accent"
              >
                <GithubIcon size={22} />
              </a>

              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 text-foreground-secondary transition-colors duration-200 hover:text-accent"
              >
                <LinkedinIcon size={22} />
              </a>

              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 text-foreground-secondary transition-colors duration-200 hover:text-accent"
              >
                <YouTubeIcon size={24} />
              </a>

              <a
                href={profile.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 text-foreground-secondary transition-colors duration-200 hover:text-[#25D366]"
              >
                <WhatsAppIcon size={22} />
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="animate-scale-in delay-200 w-full max-w-[34rem] rounded-[2rem] border border-border bg-surface/40 p-4 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent">
                    Services at a glance
                  </div>
                  <div className="mt-2 text-sm text-foreground-secondary sm:text-base">
                    Services and technology we work with.
                  </div>
                </div>
                <div className="hidden rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground-muted sm:block">
                  Our capabilities
                </div>
              </div>
              <TechFlow />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-fade-in delay-700 md:block">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-foreground-muted transition-colors duration-200 hover:text-accent"
          aria-label="Scroll to about section"
        >
          <span className="text-xs font-mono tracking-wide">
            Discover our services
          </span>
          <ChevronDownIcon size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
