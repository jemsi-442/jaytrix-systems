import Image from "next/image";
import {
  SiCplusplus,
  SiAndroid,
  SiApple,
  SiBurpsuite,
  SiCloudflare,
  SiDart,
  SiDjango,
  SiDigitalocean,
  SiExpress,
  SiFlutter,
  SiGit,
  SiGnubash,
  SiGo,
  SiHashcat,
  SiJavascript,
  SiKalilinux,
  SiLaravel,
  SiLinux,
  SiMariadb,
  SiMetasploit,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiOwasp,
  SiReact,
  SiRedis,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
  SiGithub,
  SiWireshark,
  SiZap,
} from "@icons-pack/react-simple-icons";

const stacks = [
  {
    title: "Web interfaces",
    note: "Customer and staff experiences",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    title: "Backend & programming",
    note: "Server-side tools and programming languages",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "Go", Icon: SiGo },
      { name: "PHP", Icon: SiPhp },
      { name: "Laravel", Icon: SiLaravel },
      { name: "Symfony", Icon: SiSymfony },
      { name: "Django", Icon: SiDjango },
      { name: "C++", Icon: SiCplusplus },
    ],
  },
  {
    title: "Databases & data",
    note: "Business records and information",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "MariaDB", Icon: SiMariadb },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
      { name: "Prisma", caption: "Afaq MMS plan", Icon: SiPrisma },
    ],
  },
  {
    title: "Mobile platforms",
    note: "Apps for phones and tablets",
    items: [
      { name: "Flutter", Icon: SiFlutter },
      { name: "Dart", Icon: SiDart },
      { name: "Android", Icon: SiAndroid },
      { name: "iOS", Icon: SiApple },
    ],
  },
  {
    title: "Infrastructure & deployment",
    note: "Servers, hosting and delivery workflows",
    items: [
      { name: "Linux", Icon: SiLinux },
      { name: "Nginx", Icon: SiNginx },
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Bash", Icon: SiGnubash },
      { name: "DigitalOcean VPS", Icon: SiDigitalocean },
      { name: "Cloudflare", Icon: SiCloudflare },
    ],
    details: ["Linux server administration", "Systemd services", "Firewall and access controls", "Backups and monitoring"],
  },
  {
    title: "Cybersecurity & hardening",
    note: "Tools and methods for authorized security assessment",
    items: [
      { name: "Burp Suite", Icon: SiBurpsuite },
      { name: "Metasploit", Icon: SiMetasploit },
      { name: "Wireshark", Icon: SiWireshark },
      { name: "OWASP ZAP", Icon: SiZap },
      { name: "Hashcat", Icon: SiHashcat, darkTile: true },
      { name: "Nmap", logo: "/images/tech-stack/nmap-logo.svg" },
      { name: "sqlmap", logo: "/images/tech-stack/sqlmap-tarsier.png" },
    ],
    moreTools: [
      { name: "Hydra", purpose: "Login security auditing" },
      { name: "John the Ripper", purpose: "Password security auditing" },
      { name: "Aircrack-ng", purpose: "Wireless security auditing" },
      { name: "Gobuster", purpose: "Directory and subdomain discovery" },
    ],
    environment: { name: "Kali Linux", Icon: SiKalilinux, caption: "Security testing distro—not an individual tool" },
    reference: { name: "OWASP Top 10", Icon: SiOwasp, caption: "Web security guidance" },
    details: [
      "Reconnaissance within an approved scope",
      "Vulnerability assessment",
      "Web application security testing",
      "Authentication and access control review",
      "Linux and server configuration hardening",
      "Clear findings and remediation guidance",
    ],
    detailsTitle: "Authorized assessment work includes",
    clarification: "Tools are examples for authorized assessments. The team selects tools according to the written scope; Kali Linux is a distribution that contains security tools.",
  },
];

export default function TechnologyStacks() {
  return (
    <div className="mt-20 border-t border-border pt-14">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Technology stacks</p>
        <h3 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">Tools behind the solutions</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary md:text-base">
          Our work spans software, mobile, infrastructure and cybersecurity. Some technologies shown are planned in project specifications; the technical team confirms the stack for each delivery.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {stacks.map((stack) => (
          <article key={stack.title} className="rounded-[1.6rem] border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <h4 className="text-lg font-bold text-foreground">{stack.title}</h4>
                <p className="mt-1 text-sm text-foreground-muted">{stack.note}</p>
              </div>
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/8 text-accent">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="13" rx="2" />
                  <path d="M8 21h8M12 17v4M7 9l2 2-2 2M12 13h4" />
                </svg>
              </span>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {stack.items.map((technology) => (
                <li key={technology.name} className="group flex min-w-0 flex-col items-center rounded-2xl border border-transparent px-1 py-2 text-center transition hover:border-border hover:bg-background-secondary">
                  <span className={`grid h-16 w-16 place-items-center rounded-2xl border border-border/70 ${technology.darkTile ? "bg-[#111827]" : "bg-white"} shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md sm:h-[4.5rem] sm:w-[4.5rem]`}>
                    {technology.Icon ? <technology.Icon color="default" size={39} title={technology.name} /> : <Image src={technology.logo} width={52} height={39} alt={`${technology.name} logo`} />}
                  </span>
                  <span className="mt-2 max-w-full text-xs font-semibold leading-tight text-foreground-secondary sm:text-sm">{technology.name}</span>
                  {technology.caption && <span className="mt-1 text-[10px] leading-tight text-foreground-muted">{technology.caption}</span>}
                </li>
              ))}
            </ul>
            {stack.moreTools && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">Other assessment tools</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {stack.moreTools.map((tool) => (
                    <div key={tool.name} className="rounded-xl border border-border bg-background-secondary px-3 py-3">
                      <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{tool.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(stack.environment || stack.reference) && (
              <div className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                {[stack.environment, stack.reference].filter(Boolean).map((item) => (
                  <div key={item.name} className="flex items-center gap-3 rounded-xl border border-border bg-background-secondary p-3">
                    <item.Icon color="default" size={30} title={item.name} />
                    <span><span className="block text-sm font-semibold text-foreground">{item.name}</span><span className="block text-xs text-foreground-muted">{item.caption}</span></span>
                  </div>
                ))}
              </div>
            )}
            {stack.details && (
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">{stack.title === "Cybersecurity & hardening" ? "Authorized security work includes" : "Operations support includes"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stack.details.map((item) => (
                    <span key={item} className="rounded-full border border-border bg-background-secondary px-3 py-1.5 text-xs font-medium text-foreground-secondary">{item}</span>
                  ))}
                </div>
                {stack.clarification && <p className="mt-4 rounded-xl border border-accent/15 bg-accent/5 px-4 py-3 text-xs leading-relaxed text-foreground-secondary">{stack.clarification}</p>}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
