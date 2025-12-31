import { useState } from "react";

const Header = ({ darkMode, setDarkMode }: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ['Projects', 'Skills', 'Experience', 'About', 'Contact', 'Resume'];

  return (
    <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
      {/* Logo / Name */}
      <div className="flex items-center gap-4">
        <div>
          <div className="text-lg font-semibold">Ashish Namdeo</div>
          <div className="text-xs opacity-80">Backend • AI/ML • Frontend</div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-sm opacity-90">
        {links.map((link) => {
          const isResume = link.toLowerCase() === 'resume';
          return (
            <a
              key={link}
              href={isResume ? '/resume.pdf' : `#${link.toLowerCase()}`}
              target={isResume ? '_blank' : '_self'}
              rel={isResume ? 'noopener noreferrer' : undefined}
              className="relative px-1 transition-all duration-200 border-slate-500 dark:border-slate-500 hover:text-teal-500 hover:scale-105"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-500 transition-all duration-200 group-hover:w-full"></span>
            </a>
          );
        })}
      </nav>

      {/* Mobile Menu & Dark Mode */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-md border border-slate-500 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-slate-800 dark:bg-slate-500 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-slate-800 dark:bg-slate-500 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-slate-800 dark:bg-slate-500 transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-20 right-4 w-56 flex flex-col items-center md:hidden py-4 gap-4 z-50
                     bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg rounded-lg"
        >
          {links.map((link) => {
            const isResume = link.toLowerCase() === 'resume';
            return (
              <a
                key={link}
                href={isResume ? '/resume.pdf' : `#${link.toLowerCase()}`}
                target={isResume ? '_blank' : '_self'}
                rel={isResume ? 'noopener noreferrer' : undefined}
                className={`text-sm opacity-90 ${darkMode ? 'text-slate-100' : 'text-slate-800'} hover:text-teal-500 transition-colors`}
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
