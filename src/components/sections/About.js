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
            subtitle="JAYTRIX SYSTEMS provides practical digital services to businesses, organizations, and individuals across Tanzania."
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
      </div>
    </section>
  );
}
