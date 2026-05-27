import type { Metadata } from "next";
import "./globals.css";
import Analytics from "./components/common/Analytics";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=La+Belle+Aurore&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("ashish-portfolio-theme");if(t==="light")document.documentElement.classList.remove("dark");else if(t==="dark")document.documentElement.classList.add("dark");else{document.documentElement.classList.add("dark");}})();`,
          }}
        />
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

      <body>{children}</body>
    </html>
  );
}
