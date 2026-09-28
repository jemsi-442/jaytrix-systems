import { profile } from "@/lib/data";
import Button from "@/components/ui/Button";
import TechFlow from "@/components/ui/TechFlow";
import { JayTrixMarkIcon, ChevronDownIcon, WhatsAppIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-24 pb-16 sm:pt-28 md:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-accent/8 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-20" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8">
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-border bg-surface/80 px-4 py-2 shadow-sm">
            <JayTrixMarkIcon size={30} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">JAYTRIX SYSTEMS · TANZANIA</span>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Your technology partner</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Technology that moves your business <span className="text-accent">forward.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-secondary md:text-xl">
            {profile.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-muted">
            From custom business systems and digital products to IT support and security, we make technology practical for the way you work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg">Talk to our team</Button>
            <a href={profile.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
              <WhatsAppIcon size={19} /> Chat on WhatsApp
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6 text-sm font-medium text-foreground-secondary">
            <span>Built around your workflow</span>
            <span>Security considered from day one</span>
            <span>Support as you grow</span>
          </div>
        </div>

        <div className="relative z-10">
          <TechFlow />
        </div>
      </div>

      <a href="#about" aria-label="Discover JAYTRIX SYSTEMS" className="relative mt-12 hidden flex-col items-center gap-2 text-xs font-medium text-foreground-muted transition hover:text-accent md:flex">
        <span>Discover JAYTRIX SYSTEMS</span>
        <ChevronDownIcon size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
