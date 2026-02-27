import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = ({ darkModeFlag }: { darkModeFlag: boolean }) => {
  return (
    <footer className="py-10 text-center space-y-4 text-[var(--muted)]">
      <div className="flex justify-center gap-6">
        <a
          href="https://github.com/ashishnamdeo16"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-full p-2 text-[var(--muted)] transition-all duration-300 hover:text-white hover:scale-125 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label="GitHub"
        >
          <FaGithub size={24} className="transition-transform duration-300 group-hover:rotate-12" />
        </a>
        <a
          href="https://www.linkedin.com/in/ashishnamdeo16/"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-full p-2 text-[var(--muted)] transition-all duration-300 hover:text-blue-500 hover:scale-125 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} className="transition-transform duration-300 group-hover:rotate-12" />
        </a>
        <a
          href="https://leetcode.com/u/ashishnamdeo14/"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-full p-2 text-[var(--muted)] transition-all duration-300 hover:text-amber-500 hover:scale-125 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label="LeetCode"
        >
          <SiLeetcode size={24} className="transition-transform duration-300 group-hover:rotate-12" />
        </a>
        <a
          href="https://www.instagram.com/ashish_namdeoo/"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-full p-2 text-[var(--muted)] transition-all duration-300 hover:text-pink-500 hover:scale-125 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label="Instagram"
        >
          <FaInstagram size={24} className="transition-transform duration-300 group-hover:rotate-12" />
        </a>
      </div>
      <div className="prose-caption">© 2025 Ashish Namdeo. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
