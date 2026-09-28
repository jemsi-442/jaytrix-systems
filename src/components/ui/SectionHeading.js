import { cn } from "@/lib/utils";

export default function SectionHeading({ title, subtitle, className }) {
  return (
    <div className={cn("mb-12 text-center md:mb-14", className)}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">JAYTRIX SYSTEMS</p>
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground-secondary md:text-lg">{subtitle}</p>}
    </div>
  );
}
