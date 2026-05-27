export const SITE = {
  name: "Ashish Namdeo",
  tagline: "Backend • AI/ML • Frontend",
  role: "Software Engineer",
  subtitle:
    "Graduate Student at CSUN | Full-Stack Developer | Building reliable, scalable systems",
  social: {
    github: "https://github.com/ashishnamdeo16",
    linkedin: "https://www.linkedin.com/in/ashishnamdeo16/",
    leetcode: "https://leetcode.com/u/ashishnamdeo14/",
    instagram: "https://www.instagram.com/ashish_namdeoo/",
  },
  resumeUrl: "/resume.pdf",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/", sectionId: "hero", icon: "home" as const },
  { label: "About", href: "/about", sectionId: "about", icon: "about" as const },
  { label: "Skills", href: "/skills", sectionId: "skills", icon: "skills" as const },
  { label: "Projects", href: "/projects", sectionId: "projects", icon: "projects" as const },
  { label: "Experience", href: "/experience", sectionId: "experience", icon: "experience" as const },
  { label: "Contact", href: "/contact", sectionId: "contact", icon: "contact" as const },
  { label: "Blog", href: "/blog", sectionId: null, icon: "blog" as const },
] as const;
