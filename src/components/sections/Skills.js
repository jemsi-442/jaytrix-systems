import { skills } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Skills() {
  // Reorder categories to emphasize core engineering strengths first
  const categories = [
    skills.architecture,
    skills.database,
    skills.devops,
    skills.security,
    skills.frontend,
  ];
  const primarySkillCount = skills.architecture.items.length;
  const totalSkillCount = categories.reduce((count, category) => count + category.items.length, 0);

  return (
    <section id="skills" className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <AnimateOnScroll>
          <SectionHeading
            title="Our Services"
            subtitle="Flexible technology services to help you build, secure, and maintain your digital operations."
          />
        </AnimateOnScroll>

        <AnimateOnScroll animation="animate-fade-in-up" delay={80}>
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-border bg-surface/50 p-5 backdrop-blur-md">
              <div className="text-3xl font-bold text-accent">{primarySkillCount}</div>
              <div className="mt-1 text-sm text-foreground-secondary">
                software capabilities
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-surface/50 p-5 backdrop-blur-md">
              <div className="text-3xl font-bold text-accent">{categories.length}</div>
              <div className="mt-1 text-sm text-foreground-secondary">
                service areas
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-surface/50 p-5 backdrop-blur-md">
              <div className="text-3xl font-bold text-accent">{totalSkillCount}+</div>
              <div className="mt-1 text-sm text-foreground-secondary">
                tools and technologies
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-12">
          {categories.map((category, index) => (
            <AnimateOnScroll
              key={category.title}
              animation="animate-fade-in-up"
              delay={index * 150}
            >
              <Card className="h-full rounded-[1.75rem]">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/8 px-3 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                        {category.emphasis}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-foreground-secondary">
                    {category.items.length}
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-foreground-secondary">
                  {category.summary}
                </p>

                <div className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-foreground-muted">
                  Technology & Expertise
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom statement for authority */}
        <AnimateOnScroll animation="animate-fade-in-up" delay={600}>
          <div className="mt-12 rounded-[1.75rem] border border-border bg-surface/35 p-6 backdrop-blur-md">
            <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent">
              Engineering Perspective
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-foreground-muted md:text-base">
              My strongest value is not just knowing tools, but knowing how to combine them into stable
              systems. I care about where business logic lives, how permissions behave, how data grows,
              and how the product stays maintainable once real users and real workflows start depending on it.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
