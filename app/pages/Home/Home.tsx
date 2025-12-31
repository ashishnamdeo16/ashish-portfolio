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

export default function Home(): JSX.Element {
  const [darkMode, setDarkMode] = useState(true); // default light mode

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode ? "bg-neutral-900 text-slate-100" : "bg-white text-slate-900"
      } min-h-screen antialiased transition-colors duration-500`}
    >
      {/* HEADER */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-6xl mx-auto p-6 space-y-16 transition-colors duration-500">
        {/* HERO */}
        <Hero />

        {/* ABOUT */}
        <About darkModeFlag={darkMode} />

        {/* EXPERIENCE */}

        <Experience darkModeFlag={darkMode} />

        {/* PROJECTS */}
        <Projects darkModeFlag={darkMode} />

        {/* Skills */}
        <SkillParticlesComponent darkModeFlag={darkMode} />

        {/* CONTACT */}
        <Contact />

        {/* FOOTER */}
        <Footer darkModeFlag={darkMode} />
      </main>
    </div>
  );
}
