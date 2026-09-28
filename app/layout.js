import "./globals.css";
import { profile } from "@/lib/data";

export const metadata = {
  title: `${profile.name} | ${profile.title}`,
  applicationName: "JAYTRIX SYSTEMS",
  description: `${profile.tagline} Based in ${profile.location}.`,
  keywords: [
    "JayTrix Systems",
    "Custom Software Development",
    "Business Management Systems",
    "POS and Inventory Systems",
    "Payroll Systems",
    "Web and Mobile Applications",
    "Linux and IT Support",
    "Cybersecurity Services",
    "Tanzania",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: `${profile.tagline} Based in ${profile.location}.`,
    siteName: profile.name,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "JAYTRIX SYSTEMS company website preview",
      },
    ],
    type: "website",
    locale: "en_TZ",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description: `${profile.tagline} Based in ${profile.location}.`,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const bodyClass = "antialiased bg-background text-foreground";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: profile.name,
    alternateName: "JayTrix Systems",
    description: profile.tagline,
    email: profile.email,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: profile.location,
    },
    knowsAbout: [
      "Custom Business Software",
      "Web and Mobile Applications",
      "Linux Administration",
      "Cybersecurity",
      "Penetration Testing",
      "API Security",
    ],
    sameAs: [
      profile.social.whatsapp,
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClass} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
