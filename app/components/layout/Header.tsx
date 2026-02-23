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

const Header = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) => {
  const pathname = usePathname();
  const isHomePage = landingPaths.includes(pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isHomePage) return;
    const sectionId = pathname.slice(1).toLowerCase();
    if (!sectionId) return;
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 15;
      const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? "auto" : "smooth" });
    };
    requestAnimationFrame(doScroll);
    const t1 = setTimeout(doScroll, 150);
    const t2 = setTimeout(doScroll, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedMenu = menuRef.current?.contains(target);
      const clickedHamburger = hamburgerRef.current?.contains(target);
      if (menuOpen && !clickedMenu && !clickedHamburger) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const links = isHomePage ? ["Projects", "Skills", "Experience", "About", "Contact", "Blog", "Resume"] : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)]/60 bg-[var(--bg)]/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo / Name */}
        <a
          href="/"
          className="group flex shrink-0 items-center gap-3 rounded-lg px-2 py-1 -mx-2 -my-1 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
        >
          <div>
            <div className="text-lg font-semibold tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]">Ashish Namdeo</div>
            <div className="text-xs text-[var(--muted)]">Backend • AI/ML • Frontend</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
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
                className="relative px-3 py-2 prose-caption font-medium text-[var(--muted)] rounded-lg group overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              >
                <span className="absolute inset-0 rounded-lg bg-[var(--accent)]/0 transition-all duration-300 ease-out group-hover:bg-[var(--accent)]/10" />
                <span className="relative inline-block transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-y-[-2px] group-hover:tracking-wide">{link}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Home (on non-home) + Toggle + Mobile button */}
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <a
              href="/"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 prose-caption font-medium text-[var(--text)] transition-all duration-300 hover:bg-[var(--surface2)] hover:text-[var(--accent)] hover:scale-105 hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              Home
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              const next = !darkMode;
              setDarkMode(next);
              localStorage.setItem("ashish-portfolio-theme", next ? "dark" : "light");
            }}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 prose-caption font-medium text-[var(--text)] transition-all duration-300 hover:bg-[var(--surface2)] hover:border-[var(--accent)]/50 hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] group"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{darkMode ? "🌙" : "☀️"}</span>
            <span className="hidden sm:inline">{darkMode ? "Dark" : "Light"}</span>
          </button>

          {isHomePage && (
            <button
              ref={hamburgerRef}
              type="button"
              className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 rounded-lg hover:bg-[var(--surface2)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-[var(--text)] transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-[var(--text)] transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-[var(--text)] transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && links.length > 0 && (
        <div
          ref={menuRef}
          className="absolute inset-x-0 top-full z-50 border-b border-[var(--border)]/60 bg-[var(--bg)]/95 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-px px-6 py-6" aria-label="Mobile main navigation">
            {links.map((link, i) => {
              const key = link.toLowerCase().trim();
              const isResume = key === "resume";
              const href = routeMap[key] ?? "/";

              return (
                <a
                  key={link}
                  href={href}
                  target={isResume ? "_blank" : "_self"}
                  rel={isResume ? "noopener noreferrer" : undefined}
                  className="group relative rounded-lg px-4 py-4 prose-body font-medium text-[var(--text)] transition-all duration-300 hover:bg-[var(--surface2)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-inset overflow-hidden"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 rounded-r bg-[var(--accent)] transition-all duration-300 group-hover:h-8" />
                  <span className="relative pl-2 block transition-transform duration-300 group-hover:translate-x-1">{link}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
