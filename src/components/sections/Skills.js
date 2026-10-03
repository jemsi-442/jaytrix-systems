import { skills } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import TechnologyStacks from "@/components/sections/TechnologyStacks";

const deliverySteps = [
  { number: "01", title: "Understand", text: "We learn about your goals, current setup and day-to-day workflow." },
  { number: "02", title: "Build the right fit", text: "We agree on a practical solution and deliver it in clear steps." },
  { number: "03", title: "Support and improve", text: "We help you operate the solution and plan what comes next." },
];

export default function Skills() {
  const services = [skills.architecture, skills.frontend, skills.database, skills.devops, skills.security];

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            title="Services for the way you work"
            subtitle="Choose the support you need today. We can also bring services together into one solution for your business."
          />
        </AnimateOnScroll>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.title} animation="animate-fade-in-up" delay={index * 80}>
              <article className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-xl hover:shadow-accent/5 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold tracking-[0.18em] text-accent">{service.emphasis}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/8 text-sm font-bold text-accent transition group-hover:bg-accent group-hover:text-white">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-foreground-secondary">{service.summary}</p>
                <ul className="mt-5 space-y-3 border-t border-border pt-5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-auto inline-flex items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-accent transition hover:text-accent-dark">
                  Discuss this service <span aria-hidden="true">→</span>
                </a>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        <TechnologyStacks />

        <div className="mt-20 rounded-[2rem] bg-[#071b3b] px-6 py-8 text-white md:px-10 md:py-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">How we work</p>
            <h3 className="mt-3 text-2xl font-bold md:text-3xl">Clear steps. Practical outcomes.</h3>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {deliverySteps.map((step) => (
              <div key={step.number} className="border-t border-white/15 pt-4">
                <span className="text-xs font-mono text-cyan-200">{step.number}</span>
                <h4 className="mt-2 font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
