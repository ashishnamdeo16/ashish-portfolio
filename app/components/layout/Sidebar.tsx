"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaGithub,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaUserAstronaut,
  FaEnvelope,
  FaLaptopCode,
  FaProjectDiagram,
  FaBriefcase,
  FaBlog,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { NAV_LINKS, SITE } from "@/app/lib/site";

const iconMap = {
  home: FaHome,
  about: FaUserAstronaut,
  skills: FaLaptopCode,
  projects: FaProjectDiagram,
  experience: FaBriefcase,
  contact: FaEnvelope,
  blog: FaBlog,
} as const;

type SidebarProps = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
};

export default function Sidebar({ darkMode, setDarkMode }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="sidebar" aria-label="Site navigation">
      <Link href="/" className="sidebar__logo" aria-label={`${SITE.name} home`}>
        <ImageMark />
        <span className="sidebar__logo-name">{SITE.name.split(" ")[0]}</span>
        <span className="sidebar__logo-role">{SITE.role}</span>
      </Link>

      <nav className="sidebar__nav" aria-label="Primary">
        {NAV_LINKS.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isActive(item.href);
          return (
            <div key={item.href} className="sidebar__nav-item">
              <Link
                href={item.href}
                className={`sidebar__nav-link ${active ? "sidebar__nav-link--active" : ""}`}
                data-label={item.label.toUpperCase()}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="sr-only">{item.label}</span>
              </Link>
              <div className="sidebar__nav-divider" />
            </div>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__theme"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span aria-hidden="true">{darkMode ? "🌙" : "☀️"}</span>
        </button>

        <ul className="sidebar__social">
          <li>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={16} />
            </a>
          </li>
          <li>
            <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={16} />
            </a>
          </li>
          <li>
            <a href={SITE.social.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <SiLeetcode size={16} />
            </a>
          </li>
          <li>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={16} />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function ImageMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/assets/favicon-32x32.png" alt="" className="sidebar__logo-img" width={40} height={40} />
  );
}
