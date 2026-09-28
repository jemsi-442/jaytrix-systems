"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  SendIcon,
  LinkedinIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || `Message from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.open(mailtoLink, "_blank");
    setStatus("drafted");
    setTimeout(() => setStatus(null), 3000);
  };

  const handleQuickStart = (theme) => {
    setFormData((prev) => ({
      ...prev,
      subject: prev.subject || theme,
      message:
        prev.message ||
        `Hello JAYTRIX SYSTEMS,\n\nI would like to discuss: ${theme}.\n\nProject overview:\n- \n- \n-\n`,
    }));
  };

  const contactInfo = [
    {
      icon: MailIcon,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: profile.social.whatsapp,
      target: "_blank",
    },
    {
      icon: YouTubeIcon,
      label: "YouTube",
      value: "JayTrix Systems",
      href: profile.social.youtube,
      target: "_blank",
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ];
  const quickActions = [
    {
      label: "Email",
      href: `mailto:${profile.email}`,
      icon: MailIcon,
    },
    {
      label: "WhatsApp",
      href: profile.social.whatsapp,
      icon: WhatsAppIcon,
    },
    {
      label: "LinkedIn",
      href: profile.social.linkedin,
      icon: LinkedinIcon,
    },
    {
      label: "YouTube",
      href: profile.social.youtube,
      icon: YouTubeIcon,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            title="Get in Touch"
            subtitle="Tell us what technology support your business or organization needs."
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <AnimateOnScroll animation="animate-slide-in-left">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Let&apos;s Find the Right Solution
              </h3>
              <p className="text-foreground-secondary mb-8 leading-relaxed">
                We provide software development, IT and Linux support, systems improvement, and cybersecurity services. Reach out through the channel that works best for you.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface/70 px-3 py-4 text-sm font-medium text-foreground-secondary transition-all duration-200 hover:border-accent/40 hover:text-accent hover:shadow-lg hover:shadow-accent-glow"
                    >
                      <Icon size={22} />
                      <span>{action.label}</span>
                    </a>
                  );
                })}
              </div>

              <div className="mb-8 rounded-[1.75rem] border border-border bg-surface/50 p-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent">
                  Services We Can Discuss
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {profile.collaborationThemes.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => handleQuickStart(theme)}
                      className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground-secondary transition-all duration-300 hover:border-accent/40 hover:text-accent"
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-accent/20 bg-accent/10 p-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                    Availability
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {profile.availability}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface/50 p-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground-muted">
                    Response
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {profile.responseTime}
                  </p>
                </div>
              </div>

              <div className="mb-8 rounded-[1.75rem] border border-border bg-background/50 p-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-foreground-muted">
                  Engagement Style
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  Clear requirements are helpful, but not required. If you only have a rough idea,
                  I can still help shape the system direction, workflow structure, and delivery path.
                </p>
              </div>

              <div className="mb-8 rounded-[1.75rem] border border-accent/20 bg-accent/8 p-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent">
                  Our Services
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  Ask us about the technology services and support your organization needs.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.roleFlexibility.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground-secondary"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const isWhatsApp = item.label === "WhatsApp";
                  const content = (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface/60 border border-border hover:border-accent/50 transition-all duration-300 group">
                      <div className={`p-3 rounded-lg transition-all duration-300 ${
                        isWhatsApp
                          ? "bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white"
                          : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-foreground-muted uppercase tracking-wider">
                          {item.label}
                        </div>
                        <div className="text-foreground font-medium">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block"
                        {...(item.target ? { target: item.target, rel: "noopener noreferrer" } : {})}
                      >
                        {content}
                      </a>
                    );
                  }
                  return <div key={item.label}>{content}</div>;
                })}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Contact form */}
          <AnimateOnScroll animation="animate-slide-in-right">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6 md:p-8 rounded-2xl bg-surface/60 border border-border"
            >
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-accent">
                  Service Inquiry
                </div>
                <h3 className="mt-3 text-2xl font-bold text-foreground">
                  Tell us what you need
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  Share your goal, the service you are looking for, and any relevant details. We will follow up to discuss a suitable next step.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground-secondary">
                Sending this form opens your email client with the message pre-filled,
                so you can review it before sending.
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground-muted">
                    Focus
                  </div>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    Architecture
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground-muted">
                    Response
                  </div>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    Contact us
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/60 p-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-foreground-muted">
                    Best For
                  </div>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    Business & IT
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground-secondary mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground-secondary mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground-secondary mb-1.5"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                  placeholder="Project discussion"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground-secondary mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 resize-none"
                  placeholder="Tell us what service you need..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                {status === "drafted" ? (
                  "Email Draft Opened"
                ) : (
                  <>
                    Send Message <SendIcon size={18} />
                  </>
                )}
              </Button>
              {status === "drafted" && (
                <div className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
                  Your email app should open with your inquiry prepared for review.
                </div>
              )}
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
