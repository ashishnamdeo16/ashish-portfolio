"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE } from "@/app/lib/site";

const routeMap: Record<string, string> = {
  projects: "/projects",
  skills: "/skills",
  experience: "/experience",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  resume: SITE.resumeUrl,
};

const landingPaths = ["/", "/projects", "/skills", "/experience", "/about", "/contact"];

type MobileHeaderProps = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
};

export default function MobileHeader({ darkMode, setDarkMode }: MobileHeaderProps) {
  const pathname = usePathname();
  const isHomePage = landingPaths.includes(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const links = isHomePage
    ? ["Projects", "Skills", "Experience", "About", "Contact", "Blog", "Resume"]
    : ["Home", "Projects", "Skills", "Experience", "About", "Contact", "Blog", "Resume"];

  useEffect(() => {
    if (!isHomePage) return;
    const sectionId = pathname.slice(1).toLowerCase();
    if (!sectionId) return;
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    };
    requestAnimationFrame(doScroll);
    const t = setTimeout(doScroll, 200);
    return () => clearTimeout(t);
  }, [pathname, isHomePage]);

  useEffect(() => {
    const close = () => menuOpen && setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuOpen && !menuRef.current?.contains(target) && !hamburgerRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="mobile-header md:hidden sticky top-0 z-40 w-full border-b border-[var(--border)]/60 bg-[var(--bg)]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="min-w-0">
          <div className="text-base font-semibold text-[var(--text)] truncate">{SITE.name}</div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">{SITE.tagline}</div>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          <button
            ref={hamburgerRef}
            type="button"
            className={`mobile-header__burger ${menuOpen ? "mobile-header__burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div ref={menuRef} className="mobile-header__menu" role="dialog" aria-label="Mobile navigation">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {links.map((link) => {
              const key = link.toLowerCase();
              const isResume = key === "resume";
              const href = key === "home" ? "/" : routeMap[key] ?? "/";
              return (
                <a
                  key={link}
                  href={href}
                  target={isResume ? "_blank" : undefined}
                  rel={isResume ? "noopener noreferrer" : undefined}
                  className="rounded-lg px-4 py-3 text-[var(--text)] hover:bg-[var(--surface2)] hover:text-[var(--accent)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
