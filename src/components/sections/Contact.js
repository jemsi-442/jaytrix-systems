"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";
import { MailIcon, PhoneIcon, MapPinIcon, WhatsAppIcon } from "@/components/icons";

const serviceOptions = [
  "Business website",
  "E-commerce website",
  "Custom business management system",
  "School management system",
  "Restaurant / POS system",
  "Inventory and sales system",
  "Booking and appointment system",
  "Mobile application",
  "Desktop application",
  "Backend, API or system integration",
  "Hosting and website maintenance",
  "IT consultancy or support",
  "Cybersecurity assessment",
  "Business process automation",
  "Not sure yet — help me assess the need",
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [whatsappReady, setWhatsappReady] = useState(false);
  const [emailFieldReady, setEmailFieldReady] = useState(false);

  useEffect(() => {
    setEmailFieldReady(true);
  }, []);

  const handleChange = (event) => {
    setWhatsappReady(false);
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(whatsappInquiryUrl, "_blank", "noopener,noreferrer");
    setWhatsappReady(true);
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
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">Share a few details and we’ll prepare a WhatsApp message for you to review and send.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-foreground-secondary" htmlFor="name">Your name
                  <input id="name" name="name" autoComplete="name" maxLength={100} value={formData.name} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent" placeholder="Name" />
                </label>
                <label className="block text-sm font-medium text-foreground-secondary" htmlFor="email">Email address <span className="font-normal text-foreground-muted">(optional)</span>
                  {emailFieldReady ? (
                    <input id="email" name="email" type="email" autoComplete="email" maxLength={254} value={formData.email} onChange={handleChange} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent" placeholder="you@example.com" />
                  ) : (
                    <span aria-hidden="true" className="mt-2 block h-[50px] w-full rounded-xl border border-border bg-background" />
                  )}
                </label>
              </div>

              <label className="mt-4 block text-sm font-medium text-foreground-secondary" htmlFor="service">Service you’re interested in
                <select id="service" name="service" value={formData.service} onChange={handleChange} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent">
                  <option value="">Choose a service (optional)</option>
                  {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </label>

              <label className="mt-4 block text-sm font-medium text-foreground-secondary" htmlFor="message">How can we help?
                <textarea id="message" name="message" rows={6} maxLength={2000} value={formData.message} onChange={handleChange} required className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent" placeholder="What are you trying to improve, and how do you handle it today?" />
              </label>

              <Button type="submit" size="lg" className="mt-5 w-full justify-center"><WhatsAppIcon size={18} /> Continue to WhatsApp</Button>
              {whatsappReady && <p role="status" className="mt-3 text-center text-sm text-accent">Your message is ready in WhatsApp. Review it there, then tap Send.</p>}
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(formData.service || "JAYTRIX SYSTEMS service inquiry")}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service || "Not selected"}\n\n${formData.message}`)}`}
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
              >
                <MailIcon size={18} /> Prepare an email instead
              </a>
              <p className="mt-3 text-center text-xs leading-relaxed text-foreground-muted">No message is sent automatically. Review and send it from WhatsApp or your email app.</p>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
