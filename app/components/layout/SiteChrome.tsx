"use client";

import { useEffect, useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import RouteChangeLoader from "@/app/components/common/RouteChangeLoader";

const THEME_KEY = "ashish-portfolio-theme";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem(THEME_KEY);
    const isDark = stored === "dark" || (stored !== "light" && document.documentElement.classList.contains("dark"));
    setDarkMode(isDark);
  }, [mounted]);

  const setTheme = (value: boolean) => {
    setDarkMode(value);
    localStorage.setItem(THEME_KEY, value ? "dark" : "light");
    document.documentElement.classList.toggle("dark", value);
  };

  return (
    <div className="portfolio-shell">
      <RouteChangeLoader />
      <Sidebar darkMode={darkMode} setDarkMode={setTheme} />
      <div className="portfolio-main">
        <MobileHeader darkMode={darkMode} setDarkMode={setTheme} />
        {children}
      </div>
    </div>
  );
}
