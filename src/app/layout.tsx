import type { Metadata } from "next";
import { Orbitron, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Brent Justine Barbadillo — Frontend Developer",
  description:
    "Portfolio of Brent Justine Barbadillo, a Frontend Developer specializing in React, Next.js, and high-performance web experiences.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  keywords: [
    "Brent Justine Barbadillo",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Philippines",
    "UI/UX",
    "Portfolio",
  ],
  authors: [{ name: "Brent Justine Barbadillo" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Brent Justine Barbadillo — Frontend Developer",
    description:
      "Portfolio of Brent Justine Barbadillo, a Frontend Developer specializing in React, Next.js, and high-performance web experiences.",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brent Justine Barbadillo — Frontend Developer",
    description:
      "Portfolio of Brent Justine Barbadillo, a Frontend Developer specializing in React, Next.js, and high-performance web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceMono.variable} ${bebasNeue.variable}`}
    >
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
