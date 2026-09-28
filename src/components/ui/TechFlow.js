"use client";

import { useState } from "react";

const layers = [
  {
    radius: 20,
    nodes: [
      {
        label: "Node.js",
        color: "#062f73",
        desc: "Event-driven API layer",
      },
      {
        label: "Symfony",
        color: "#222a34",
        desc: "Enterprise service core",
      },
      {
        label: "Laravel",
        color: "#0a4ea7",
        desc: "Business logic engine",
        link: "https://github.com/jemsi-442/payroll_management",
      },
      {
        label: "Django",
        color: "#344150",
        desc: "Secure software framework",
        link: "https://github.com/jemsi-442",
      },
    ],
  },
  {
    radius: 34,
    nodes: [
      { label: "PostgreSQL", color: "#062f73", desc: "Primary relational store" },
      { label: "MongoDB", color: "#222a34", desc: "Document data layer" },
      { label: "MySQL", color: "#0a4ea7", desc: "Transactional storage" },
      { label: "Redis", color: "#344150", desc: "Caching layer" },
    ],
  },
  {
    radius: 46,
    nodes: [
      { label: "Linux", color: "#062f73", desc: "Production server OS" },
      { label: "Docker", color: "#222a34", desc: "Container orchestration" },
      { label: "CI/CD", color: "#0a4ea7", desc: "Automated deployment" },
      { label: "Nginx", color: "#344150", desc: "Edge reverse proxy" },
    ],
  },
];

const center = { x: 50, y: 50 };

function polar(cx, cy, r, angle) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function TechFlow() {
  const [active, setActive] = useState(null);
  const openNodeLink = (node) => {
    if (node.link) {
      window.open(node.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative mx-auto h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px]">
      <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl" />

      <svg viewBox="-10 -10 120 120" className="w-full h-full">
        {/* Orbit rings */}
        {layers.map((layer, i) => (
          <circle
            key={i}
            cx={center.x}
            cy={center.y}
            r={layer.radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.2"
            strokeDasharray="3 4"
            className={`animate-[spin_${50 + i * 20}s_linear_infinite${
              i % 2 ? "_reverse" : ""
            }]`}
            style={{ transformOrigin: "50px 50px" }}
          />
        ))}

        {/* Nodes */}
        {layers.map((layer) =>
          layer.nodes.map((node, i) => {
            const angle = (360 / layer.nodes.length) * i;
            const pos = polar(center.x, center.y, layer.radius, angle);
            const isActive = active?.label === node.label;

            return (
              <g
                key={node.label}
                role={node.link ? "link" : "img"}
                tabIndex={node.link ? 0 : undefined}
                aria-label={`${node.label}: ${node.desc}${node.link ? ". Open related repository" : ""}`}
                onMouseEnter={() => setActive(node)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node)}
                onBlur={() => setActive(null)}
                onClick={() => openNodeLink(node)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openNodeLink(node);
                  }
                }}
                style={{ cursor: node.link ? "pointer" : "default" }}
              >
                {/* Data flow pulse */}
                <circle r="1" fill={node.color} opacity="0.6">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={`M${center.x},${center.y} L${pos.x},${pos.y}`}
                  />
                </circle>

                {/* Connection */}
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isActive ? node.color : "var(--border)"}
                  strokeWidth="0.2"
                  strokeDasharray="1 2"
                />

                {/* Glow */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 7 : 5}
                  fill={node.color}
                  opacity={isActive ? 0.25 : 0.08}
                />

                {/* Node */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 4.5 : 3}
                  fill={node.color}
                />

                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + 8}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="2.4"
                  fontFamily="var(--font-geist-mono), monospace"
                  fontWeight="600"
                >
                  {node.label}
                </text>
              </g>
            );
          })
        )}

        {/* Core */}
        <circle cx={center.x} cy={center.y} r="15" fill="var(--accent)" opacity="0.08">
          <animate attributeName="r" values="15;18;15" dur="4s" repeatCount="indefinite" />
        </circle>

        <circle cx={center.x} cy={center.y} r="11" fill="var(--accent)" />

        <text
          x={center.x}
          y={center.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="3"
          fontFamily="var(--font-geist-mono), monospace"
          fontWeight="700"
        >
          JAYTRIX
        </text>
      </svg>

      {/* Tooltip */}
      {active && (
        <div className="absolute bottom-2 left-1/2 w-[min(18rem,calc(100%-0.75rem))] -translate-x-1/2 rounded-xl border border-border bg-surface px-4 py-2 text-center text-sm text-foreground-secondary shadow-xl backdrop-blur-md sm:bottom-6">
          <span className="font-semibold text-accent">
            {active.label}
          </span>{" "}
          — {active.desc}
        </div>
      )}
    </div>
  );
}
