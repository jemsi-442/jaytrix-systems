import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: `JayTrix Systems | ${profile.title}`,
  applicationName: "JAYTRIX SYSTEMS",
  description: `${profile.tagline} Based in ${profile.location}.`,
  keywords: [
    "JayTrix Systems",
    "Custom Software Development",
    "IT Services",
    "Linux System Administration",
    "Cybersecurity",
    "Penetration Testing",
    "Next.js",
    "Node.js",
    "PHP",
    "Symfony",
    "Laravel",
    "Django",
    "MongoDB",
    "MySQL",
    "RBAC",
    "Secure API Architecture",
    profile.name,
    "Tanzania",
    "Software Development",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: "JayTrix Systems",
  openGraph: {
    title: `JayTrix Systems | ${profile.title}`,
    description: `${profile.tagline} Based in ${profile.location}.`,
    siteName: "JayTrix Systems",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "JAYTRIX SYSTEMS company website preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `JayTrix Systems | ${profile.title}`,
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
  const bodyClass = `${poppins.variable} ${inter.variable} antialiased bg-background text-foreground`;
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
      "Software Architecture",
      "Role-Based Access Control",
      "Linux Administration",
      "Cybersecurity",
      "Penetration Testing",
      "API Security",
    ],
    sameAs: [
      profile.social.github,
      profile.social.linkedin,
      profile.social.youtube,
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
