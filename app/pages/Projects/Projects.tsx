"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import ScrollReveal from "@/app/components/common/ScrollReveal";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  url?: string;
};

const projects: Project[] = [
  {
    id: 'carpool',
    title: 'Carpool',
    subtitle: 'Ride-sharing & Commute Coordination',
    description: 'A carpool app to connect riders and drivers for shared commutes, reducing emissions and travel costs.',
    tags: ['React', 'Java', 'MySQL'],
    imageUrl: '/assets/CarPool.webp',
    url: 'https://github.com/ashishnamdeo16/carpool'
  },
  {
    id: 'netguardian',
    title: 'Deep Packet Inspection',
    subtitle: 'Network Security & DPI',
    description: 'Deep packet inspection tool for network traffic analysis, threat detection, and protocol identification.',
    tags: ['Java','Python', 'Networking', 'Security'],
    imageUrl: '/assets/netgd.webp',
    url: 'https://github.com/ashishnamdeo16/netguardian-dpi'
  },
  {
    id: 'journal-app-java',
    title: 'My Journal App',
    subtitle: 'Habit & Productivity Tracker',
    description: 'A Java-based journal app to track habits, manage tasks, and monitor personal growth with an intuitive interface.',
    tags: ['Java', 'Redis', 'Spring Security', 'Maven'],
    imageUrl: '/assets/journalApp.webp',
    url: 'https://github.com/ashishnamdeo16/journalApp'
  },
  {
    id: 'authx',
    title: 'AuthX',
    subtitle: 'Authentication & Authorization Service',
    description: 'Designed with real-world backend architecture and system design principles used in modern SaaS and microservice platforms.',
    tags: ['Java', 'Redis', 'Spring Security', 'Maven','MySQL','OAuth2.0'],
    imageUrl: '/assets/authx.webp',
    url: 'https://github.com/ashishnamdeo16/authx'
  },
  {
    id: 'habbit-doc',
    title: 'HabbitDoc',
    subtitle: 'Habit app with AR rewards',
    description: 'A Flutter app combining Pomodoro productivity, AR rewards, and progress tracking to boost focus and motivation.',
    tags: ['Flutter','Dart', 'AR', 'UX'],
    imageUrl: '/assets/habbitDoc.webp',
    url: 'https://github.com/ashishnamdeo16/SS12-ADHD-HabitDoc'
  },
  {
    id: 'raipur-ra',
    title: 'Raipur Radiance Theme',
    subtitle: 'VS Code Theme',
    description: 'Raipur Radiance is a vibrant VS Code theme with warm orange accents for a refreshing coding experience.',
    tags: ['JSON Configuration', 'Color Palette Design'],
    imageUrl: '/assets/Raipur_radiance.webp',
    url: 'https://marketplace.visualstudio.com/items?itemName=AshishNamdeo.raipur-radiance'
  },
  {
    id: 'crazyM416',
    title: 'CrazyM416',
    subtitle: 'Gaming Blog',
    description: 'Comprehensive blog dedicated to PUBG Mobile enthusiasts and tech-savvy individuals.',
    tags: ['WordPress'],
    imageUrl: '/assets/crazym416.webp',
    url: 'https://crazym416.com/'
  },
];

export default function Projects({ darkModeFlag }: { darkModeFlag: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <ScrollReveal as="section" id="projects" className="space-y-12 py-16 px-4 md:px-8">
      <motion.h2
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        className="prose-section text-center mb-14 text-[var(--text)]"
      >
        My Projects
      </motion.h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, index) => (
          <motion.article
            key={p.id}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 bg-[var(--surface)]/80 backdrop-blur-sm border border-[var(--border)]/80 text-[var(--text)] hover:border-[var(--accent)]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-[var(--surface)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            <div className="relative aspect-video shrink-0 overflow-hidden bg-[var(--surface2)]/50">
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col flex-1 p-5 sm:p-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">{p.subtitle}</p>
              <h3 className="text-lg font-semibold tracking-tight text-[var(--text)] mb-3 transition-colors duration-200 group-hover:text-[var(--accent)]">{p.title}</h3>
              <p className="line-clamp-3 text-[15px] leading-relaxed text-[var(--muted)] flex-1 mb-5">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--surface2)]/80 text-[var(--muted)] border border-[var(--border)]/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:gap-3 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-lg w-fit"
              >
                <FaGithub size={16} className="opacity-80" />
                View code
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </ScrollReveal>
  );
}
