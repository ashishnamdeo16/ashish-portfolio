"use client";

import { useState, useEffect, JSX } from "react";
import Experience from "@/app/pages/Experience/Experience";
import Contact from "@/app/pages/Contact/contact";
import Projects from "../Projects/Projects";
import About from "../About/About";
import Footer from "@/app/components/layout/Footer";
import Hero from "../Hero/Hero";
import Sidebar from "@/app/components/layout/Sidebar";
import MobileHeader from "@/app/components/layout/MobileHeader";
import ScrollIndicator from "@/app/components/common/ScrollIndicator";
import RouteChangeLoader from "@/app/components/common/RouteChangeLoader";

import Skills from "@/app/pages/Skills/Skills";

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
    <div className="portfolio-shell">
      <RouteChangeLoader />
      <Sidebar darkMode={darkMode} setDarkMode={handleSetDarkMode} />

      <div className="portfolio-main">
        <MobileHeader darkMode={darkMode} setDarkMode={handleSetDarkMode} />
        <ScrollIndicator />

        <main>
          <Hero />
          <div className="content-section content-section--after-hero">
            <About darkModeFlag={darkMode} />
          </div>
          <div className="content-section">
            <Experience darkModeFlag={darkMode} />
          </div>
          <div className="content-section content-section--flush">
            <Projects darkModeFlag={darkMode} />
          </div>
          <div className="content-section content-section--flush">
            <Skills darkModeFlag={darkMode} />
          </div>
          <div className="content-section">
            <Contact darkModeFlag={darkMode} />
          </div>
          <Footer darkModeFlag={darkMode} />
        </main>
      </div>
    </div>
  );
}
