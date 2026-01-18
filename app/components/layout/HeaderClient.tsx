"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";

export default function HeaderClient() {
  const [darkMode, setDarkMode] = useState(true);

  // Optional: load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDarkMode(saved === "dark");
  }, []);

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return <Header darkMode={darkMode} setDarkMode={setDarkMode} />;
}
