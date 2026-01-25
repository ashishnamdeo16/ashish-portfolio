"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const routeMap: Record<string, string> = {
  projects: "/projects",
  skills: "/skills",
  experience: "/experience",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  resume: "/resume.pdf",
};


const landingPaths = ["/", "/projects", "/skills", "/experience", "/about", "/contact"];

const Header = ({ darkMode, setDarkMode }: any) => {

  const pathname = usePathname();
  const isHomePage = landingPaths.includes(pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (!isHomePage) return;

  const sectionId = pathname.replace("/", "");
  if (!sectionId) return;

  const doScroll = () => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 15;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // run now + after layout settles (dynamic Skills / images load)
  requestAnimationFrame(doScroll);
  const t1 = setTimeout(doScroll, 100);
  const t2 = setTimeout(doScroll, 400);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, [pathname, isHomePage]);


  /* Close menu on scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  /* Close menu on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const links = isHomePage ? ["Projects", "Skills", "Experience", "About", "Contact", "Blog", "Resume"] : [];

  return (
    <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
      {/* Logo / Name */}
      <div className="flex items-center gap-4">
        <div>
          <div className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black" }"`}>
            <a href="/">Ashish Namdeo</a>
          </div>
          <div className={`text-xs opacity-80 ${darkMode ? "text-white" : "text-black" }`}>Backend • AI/ML • Frontend</div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-sm opacity-90">
        {links.length !== 0 &&
          links.map((link) => {
            const key = link.toLowerCase().trim();
            const isResume = key === "resume";
            const href = routeMap[key] ?? "/";

            return (
              <a
                key={link}
                href={href}
                target={isResume ? "_blank" : "_self"}
                rel={isResume ? "noopener noreferrer" : undefined}
                className={`relative px-1 transition-all duration-200  ${darkMode ? "text-white" : "text-black" } border-slate-500 dark:border-slate-500 hover:text-teal-500 hover:scale-105`}>
                {link}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            );
          })}
      </nav>

      {/* Mobile Menu & Dark Mode */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        {isHomePage ? (
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded-md border border-slate-500 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        ) : (
          <a
            href="/"
            className="px-3 py-1 rounded-md border border-slate-500 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {"Home"}
          </a>
        )}

        {/* Hamburger */}
        {isHomePage ? (
          <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            <span
              className={`block w-6 h-0.5 bg-slate-800 dark:bg-slate-500 transition-transform ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-slate-800 dark:bg-slate-500 transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-slate-800 dark:bg-slate-500 transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        ) : null}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className={`absolute top-20 right-4 w-56 flex flex-col items-center md:hidden py-4 gap-4 z-50
          ${darkMode ? "bg-white/90" : "bg-gray-900/90"} backdrop-blur-md shadow-lg rounded-lg`}
        >
          {links.map((link) => {
            const key = link.toLowerCase().trim();
            const isResume = key === "resume";
            const href = routeMap[key] ?? "/";

            return (
              <a
                key={link}
                href={href}
                target={isResume ? "_blank" : "_self"}
                rel={isResume ? "noopener noreferrer" : undefined}
                className={`text-sm opacity-90 ${
                  darkMode ? "text-slate-800" : "text-slate-100"
                } hover:text-teal-500 transition-colors`}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
