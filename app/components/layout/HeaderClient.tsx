"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";

export default function HeaderClient() {
  const [darkMode, setDarkMode] = useState(true);

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", "dark" );
  }, [darkMode]);

  return <Header darkMode={darkMode} setDarkMode={setDarkMode} />;
}
