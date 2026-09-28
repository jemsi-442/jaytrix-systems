"use client";

import { useState, useEffect } from "react";
import { navLinks, profile } from "@/lib/data";
import useScrollSpy from "@/hooks/useScrollSpy";
import { JayTrixMarkIcon, MenuIcon, XIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300", scrolled ? "border-border bg-background/90 shadow-sm" : "border-transparent bg-background/75")}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[4.5rem] lg:px-8" aria-label="Main navigation">
        <a href="#hero" className="group inline-flex items-center gap-3" aria-label="JAYTRIX SYSTEMS home">
          <JayTrixMarkIcon size={39} className="transition-transform group-hover:-translate-y-0.5" />
          <span className="leading-none"><span className="block text-base font-extrabold tracking-[0.14em] text-accent">JAYTRIX</span><span className="mt-1 block text-[9px] font-semibold tracking-[0.42em] text-foreground">SYSTEMS</span></span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return <a key={link.href} href={link.href} aria-current={activeId === id ? "page" : undefined} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition", activeId === id ? "bg-accent/8 text-accent" : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground")}>{link.label}</a>;
          })}
          <a href="#contact" className="ml-3 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark">Talk to our team</a>
        </div>

        <button type="button" onClick={() => setMobileOpen((open) => !open)} className="rounded-lg p-2 text-foreground-secondary transition hover:bg-background-secondary hover:text-accent md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
          {mobileOpen ? <XIcon size={23} /> : <MenuIcon size={23} />}
        </button>
      </nav>

      <div id="mobile-navigation" className={cn("fixed inset-x-0 top-16 z-40 border-b border-border bg-background px-4 pb-6 pt-3 shadow-xl transition md:hidden", mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0 pointer-events-none")}>
        <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return <a key={link.href} href={link.href} aria-current={activeId === id ? "page" : undefined} onClick={() => setMobileOpen(false)} className={cn("rounded-xl px-4 py-3 text-base font-medium transition", activeId === id ? "bg-accent/8 text-accent" : "text-foreground-secondary hover:bg-background-secondary")}>{link.label}</a>;
          })}
          <a href={profile.social.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-semibold text-white"><WhatsAppIcon size={19} /> Chat on WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
