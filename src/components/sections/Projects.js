import { projects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            title="Selected solutions"
            subtitle="A look at the kinds of systems JAYTRIX SYSTEMS designs and develops for real operational needs."
          />
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={80}>
          <div className="mb-10 flex flex-col gap-5 rounded-[1.75rem] border border-border bg-background-secondary p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="max-w-3xl text-sm leading-relaxed text-foreground-secondary md:text-base">
              From retail and payroll to organizational management and online marketplaces, our work focuses on making complex day-to-day operations easier to run. Some project details are private, so we share only the information that can be made public.
            </p>
            <a href="#contact" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark">Discuss your project</a>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.title} animation="animate-fade-in-up" delay={index * 70}>
              <ProjectCard {...project} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
