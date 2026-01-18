// ✅ app/layout.tsx  (Geist for UI + Source Serif 4 for blog body)

import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Analytics from "./components/common/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashish Namdeo | Software Engineer, AI/ML & Backend Specialist",
  description:
    "Explore Ashish Namdeo's professional portfolio showcasing expertise in web development, ReactJS, NodeJS, and Java. Discover projects, achievements, and skills in building efficient and innovative software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable}`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
        <link rel="manifest" href="/assets/site.webmanifest" />
      </head>

      <Analytics />

      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
