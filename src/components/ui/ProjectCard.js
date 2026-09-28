"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLinkIcon, GithubIcon, LockIcon } from "@/components/icons";

function getPreviewTone(title, category) {
  const key = `${title} ${category}`.toLowerCase();

  if (key.includes("marketplace") || key.includes("escrow")) {
    return {
      glow: "rgba(7, 58, 133, 0.22)",
      edge: "rgba(7, 58, 133, 0.45)",
      panel: "rgba(7, 58, 133, 0.42)",
      chip: "rgba(7, 58, 133, 0.14)",
    };
  }

  if (key.includes("pharmacy") || key.includes("inventory")) {
    return {
      glow: "rgba(34, 42, 52, 0.2)",
      edge: "rgba(34, 42, 52, 0.4)",
      panel: "rgba(34, 42, 52, 0.45)",
      chip: "rgba(34, 42, 52, 0.14)",
    };
  }

  if (key.includes("sales") || key.includes("pos") || key.includes("saas")) {
    return {
      glow: "rgba(6, 47, 115, 0.24)",
      edge: "rgba(6, 47, 115, 0.48)",
      panel: "rgba(6, 47, 115, 0.42)",
      chip: "rgba(10, 78, 167, 0.16)",
    };
  }

  if (key.includes("payroll") || key.includes("salary")) {
    return {
      glow: "rgba(11, 85, 189, 0.22)",
      edge: "rgba(11, 85, 189, 0.45)",
      panel: "rgba(11, 85, 189, 0.38)",
      chip: "rgba(11, 85, 189, 0.14)",
    };
  }

  return {
    glow: "rgba(11, 85, 189, 0.24)",
    edge: "rgba(11, 85, 189, 0.45)",
    panel: "rgba(34, 42, 52, 0.52)",
    chip: "rgba(11, 85, 189, 0.14)",
  };
}

function getPreviewMeta(title, category, tags) {
  const key = `${title} ${category}`.toLowerCase();
  const stack = tags.slice(0, 3).join(" · ");

  if (key.includes("school")) {
    return {
      label: "Workflow Preview",
      caption: "Academic Records",
      summary: stack || "Django • Python • Operations",
    };
  }

  if (key.includes("pharmacy") || key.includes("inventory")) {
    return {
      label: "Operations Preview",
      caption: "Stock & Sales Control",
      summary: stack || "Node.js • Express • MariaDB",
    };
  }

  if (key.includes("payroll")) {
    return {
      label: "Logic Preview",
      caption: "Salary Processing",
      summary: stack || "Laravel • Validation • Workflows",
    };
  }

  if (key.includes("church") || key.includes("rgc")) {
    return {
      label: "Governance Preview",
      caption: "Role & Branch Oversight",
      summary: stack || "PHP • Laravel • MySQL",
    };
  }

  if (key.includes("ecommerce")) {
    return {
      label: "Commerce Preview",
      caption: "Orders & Delivery",
      summary: stack || "React • Node.js • MariaDB",
    };
  }

  if (key.includes("marketplace") || key.includes("escrow")) {
    return {
      label: "Transaction Preview",
      caption: "Escrow State Flow",
      summary: stack || "Symfony • PHP • RBAC",
    };
  }

  if (key.includes("sales") || key.includes("pos") || key.includes("saas")) {
    return {
      label: "SaaS Preview",
      caption: "POS, Stock & Billing",
      summary: stack || "Flutter • Go • PostgreSQL",
    };
  }

  return {
    label: "System Preview",
    caption: "Architecture Snapshot",
    summary: stack || "Structured software delivery",
  };
}

export default function ProjectCard({
  title,
  category,
  status,
  image,
  imageAlt,
  role,
  description,
  highlights = [],
  tags = [],
  liveUrl,
  sourceUrl,
  placeholder = false,
}) {
  const tone = getPreviewTone(title, category);
  const previewMeta = getPreviewMeta(title, category, tags);
  const previewItems = [...highlights, ...tags].slice(0, 3);
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = image && !imageFailed;
  const isPrivate = !sourceUrl && Boolean(repoNote);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl hover:shadow-accent-glow">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Image placeholder */}
      <div
        className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/5 via-background-secondary to-accent/10"
        style={{
          boxShadow: `inset 0 0 80px ${tone.glow}`,
        }}
      >
        {showImage ? (
          <>
            <Image
              src={image}
              alt={imageAlt || `${title} project preview`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageFailed(true)}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent" />
            <div className="absolute left-4 bottom-4 rounded-full border border-white/15 bg-background/70 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              Project overview
            </div>
          </>
        ) : (
          <>
            <div
              className="absolute left-5 top-6 h-24 w-28 rounded-2xl border p-3 backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg]"
              style={{
                borderColor: tone.edge,
                backgroundColor: tone.panel,
              }}
            >
              <div className="mb-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                <span className="h-2 w-2 rounded-full bg-white/30" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-white/18" />
                <div className="h-2 w-3/4 rounded-full bg-white/12" />
                <div className="h-8 rounded-xl" style={{ backgroundColor: tone.chip }} />
              </div>
            </div>

            <div
              className="absolute bottom-5 right-5 w-[10.5rem] rounded-[1.4rem] border p-4 shadow-2xl transition-transform duration-300 group-hover:translate-y-1 group-hover:rotate-[2deg]"
              style={{
                borderColor: tone.edge,
                backgroundColor: "rgba(11, 15, 26, 0.78)",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70">
                  Workflow snapshot
                </span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: tone.edge }} />
              </div>
              <div className="space-y-2">
                {previewItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/75"
                    style={{
                      borderColor: tone.edge,
                      backgroundColor: tone.chip,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-28 w-28">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-md" />
                <div className="absolute left-1/2 top-2 h-3 w-px -translate-x-1/2 bg-white/18" />
                <div className="absolute bottom-2 left-1/2 h-3 w-px -translate-x-1/2 bg-white/18" />
                <div className="absolute left-2 top-1/2 h-px w-3 -translate-y-1/2 bg-white/18" />
                <div className="absolute right-2 top-1/2 h-px w-3 -translate-y-1/2 bg-white/18" />
              </div>
            </div>

            <div className="absolute left-5 bottom-5 right-44 rounded-[1.35rem] border px-4 py-3 backdrop-blur-md"
              style={{
                borderColor: tone.edge,
                backgroundColor: "rgba(10, 14, 24, 0.58)",
              }}
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/55">
                {previewMeta.label}
              </div>
              <div className="mt-2 text-sm font-semibold text-white/90">
                {previewMeta.caption}
              </div>
              <div className="mt-1 text-xs leading-relaxed text-white/65">
                {previewMeta.summary}
              </div>
            </div>
          </>
        )}
        {/* Decorative grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          {status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-background/70 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              {isPrivate && <LockIcon size={12} />}
              {status}
            </span>
          )}
          {category && (
            <span className="ml-auto max-w-[12rem] rounded-full border border-border bg-background/60 px-3 py-1 text-right text-[11px] text-foreground-secondary backdrop-blur-md">
              {category}
            </span>
          )}
        </div>
        {!showImage && (
          <div className="absolute left-4 top-14">
            <span className="rounded-full border border-white/12 bg-background/55 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
              Solution overview
            </span>
          </div>
        )}
        {placeholder && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-mono bg-accent/20 text-accent rounded-md">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        {role && (
          <div className="mb-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground-muted">Solution focus</div>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-accent">{role}</p>
          </div>
        )}
        <p className="mb-4 text-sm leading-relaxed text-foreground-secondary">
          {description}
        </p>
        {highlights.length > 0 && (
          <div className="mb-5">
            <div className="mb-2 text-[11px] font-mono uppercase tracking-[0.2em] text-foreground-muted">
              Core Capabilities
            </div>
            <ul className="space-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground-secondary"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors duration-200"
              aria-label={`Live demo of ${title}`}
            >
              <ExternalLinkIcon size={16} />
              <span>Live Demo</span>
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors duration-200"
              aria-label={`Source code of ${title}`}
            >
              <GithubIcon size={16} />
              <span>View project code</span>
            </a>
          )}
          {!sourceUrl && (
            <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-accent-dark">
              <span>Discuss a similar solution</span>
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
