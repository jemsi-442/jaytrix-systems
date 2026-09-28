"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, WhatsAppIcon } from "@/components/icons";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    setSent(false);
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = formData.service || "New service inquiry";
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${subject}\n\n${formData.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const whatsappMessage = [
    "Hello JAYTRIX SYSTEMS, I would like to discuss a service inquiry.",
    `Name: ${formData.name || "Not provided"}`,
    `Email: ${formData.email || "Not provided"}`,
    `Service: ${formData.service || "Not selected"}`,
    "",
    formData.message || "I would like to discuss my business needs.",
  ].join("\n");
  const whatsappInquiryUrl = `${profile.social.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  const contactItems = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: MailIcon },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, icon: PhoneIcon },
    { label: "WhatsApp", value: "Chat with our team", href: profile.social.whatsapp, icon: WhatsAppIcon },
    { label: "Location", value: profile.location, icon: MapPinIcon },
  ];

  return (
    <section id="contact" className="bg-background-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            title="Let’s talk about what you need"
            subtitle="Tell us what you are trying to achieve. We’ll help you find a practical next step."
          />
        </AnimateOnScroll>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <AnimateOnScroll animation="animate-slide-in-left">
            <div className="rounded-[2rem] bg-[#071b3b] p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Contact JAYTRIX SYSTEMS</p>
              <h3 className="mt-3 text-2xl font-bold">Let’s find a solution that fits.</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100/75">Share your challenge or idea. We’ll discuss your needs and the right service for your business.</p>

              <div className="mt-7 space-y-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-cyan-200/35 hover:bg-white/[0.08]">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-200/10 text-cyan-100"><Icon size={19} /></span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100/60">{item.label}</span>
                        <span className="mt-1 block truncate text-sm font-medium text-white">{item.value}</span>
                      </span>
                    </div>
                  );
                  return item.href ? <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>{content}</a> : <div key={item.label}>{content}</div>;
                })}
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Services</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.services.map((service) => <span key={service} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-blue-100/80">{service}</span>)}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="animate-slide-in-right">
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Start a conversation</p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">Send us your inquiry</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">This form prepares an email for you to review and send.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground-secondary" htmlFor="name">Your name
                  <input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent" placeholder="Name" />
                </label>
                <label className="block text-sm font-medium text-foreground-secondary" htmlFor="email">Email address
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent" placeholder="you@example.com" />
                </label>
              </div>

              <label className="mt-4 block text-sm font-medium text-foreground-secondary" htmlFor="service">Service you’re interested in
                <select id="service" name="service" value={formData.service} onChange={handleChange} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent">
                  <option value="">Choose a service (optional)</option>
                  {profile.services.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </label>

              <label className="mt-4 block text-sm font-medium text-foreground-secondary" htmlFor="message">How can we help?
                <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent" placeholder="Tell us a little about what you need..." />
              </label>

              <Button type="submit" size="lg" className="mt-5 w-full justify-center">{sent ? "Email draft prepared" : <>Prepare email inquiry <SendIcon size={17} /></>}</Button>
              {sent && <p role="status" className="mt-3 text-center text-sm text-accent">Your email application should open with the inquiry ready to review and send.</p>}
              <a href={whatsappInquiryUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
                <WhatsAppIcon size={18} /> Continue with WhatsApp
              </a>
              <p className="mt-3 text-center text-xs leading-relaxed text-foreground-muted">Your message opens in your chosen app for you to review and send.</p>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
