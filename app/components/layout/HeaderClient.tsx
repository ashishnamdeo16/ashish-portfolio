"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";

const THEME_KEY = "ashish-portfolio-theme";

export default function HeaderClient() {
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

  return <Header darkMode={darkMode} setDarkMode={handleSetDarkMode} />;
}
