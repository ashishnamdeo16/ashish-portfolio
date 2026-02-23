"use client";

import { useState, useEffect, JSX } from "react";
import dynamic from "next/dynamic";
import Experience from "@/app/pages/Experience/Experience";
import Contact from "@/app/pages/Contact/contact";
import Projects from "../Projects/Projects";
import Header from "@/app/components/layout/Header";
import About from "../About/About";
import Footer from "@/app/components/layout/Footer";
import Hero from "../Hero/Hero";

const SkillParticlesComponent = dynamic(
  () => import("@/app/pages/Skills/SkillParticles"),
  { ssr: false }
);

const THEME_KEY = "ashish-portfolio-theme";

export default function Home(): JSX.Element {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem(THEME_KEY);
    const isDark = stored === "dark" || (stored !== "light" && document.documentElement.classList.contains("dark"));
    setDarkMode(isDark);
  }, [mounted]);

  const handleSetDarkMode = (value: boolean) => {
    setDarkMode(value);
    localStorage.setItem(THEME_KEY, value ? "dark" : "light");
    document.documentElement.classList.toggle("dark", value);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased transition-colors duration-300">
      <Header darkMode={darkMode} setDarkMode={handleSetDarkMode} />

      <main className="mx-auto max-w-6xl space-y-16 p-6 transition-colors duration-300">
        <section id="hero">
          <Hero />
        </section>
        <About darkModeFlag={darkMode} />
        <Experience darkModeFlag={darkMode} />
        <Projects darkModeFlag={darkMode} />
        <SkillParticlesComponent darkModeFlag={darkMode} />
        <Contact darkModeFlag={darkMode} />
        <Footer darkModeFlag={darkMode} />
      </main>
    </div>
  );
}
