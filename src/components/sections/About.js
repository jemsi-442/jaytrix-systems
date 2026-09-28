import { profile } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            title="Technology That Works for Your Business"
            subtitle="We work with Tanzanian businesses and organizations to make everyday operations more organized, connected and secure."
          />
        </AnimateOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimateOnScroll animation="animate-slide-in-left">
            <div className="rounded-[1.75rem] border border-border bg-surface/60 p-7 md:p-9">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-accent/15 bg-accent/8 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">About JAYTRIX SYSTEMS</span>
              </div>
              <div className="space-y-5">
                {profile.about.map((paragraph) => <p key={paragraph} className="text-foreground-secondary leading-relaxed text-base md:text-lg">{paragraph}</p>)}
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="animate-slide-in-right">
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.workingStyle.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-background/50 p-5">
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll animation="animate-fade-in-up" delay={100}>
          <div className="mt-14 border-t border-border pt-10">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Who we work with</p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">Technology for real operating needs</h3>
              </div>
              <a href="#contact" className="text-sm font-semibold text-accent transition hover:text-accent-dark">Discuss your business needs →</a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {profile.clientTypes.map((client) => (
                <article key={client.title} className="rounded-2xl border border-border bg-background/50 p-5">
                  <h4 className="font-semibold text-foreground">{client.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{client.description}</p>
                </article>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
