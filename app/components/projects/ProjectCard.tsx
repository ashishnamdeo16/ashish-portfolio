"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { ProjectItem } from "@/app/lib/projects.data";

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  variant?: "featured" | "standard";
};

export default function ProjectCard({ project, index, variant = "standard" }: ProjectCardProps) {
  const reduced = useReducedMotion();
  const isFeatured = variant === "featured" || project.featured;

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduced ? { duration: 0 } : { duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`project-card ${isFeatured ? "project-card--featured" : ""}`}
    >
      <div className="project-card__glow" aria-hidden="true" />

      <div className="project-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.imageUrl} alt={project.title} className="project-card__image" loading="lazy" />
        <div className="project-card__media-overlay" aria-hidden="true" />
        {isFeatured && <span className="project-card__badge">Featured</span>}
      </div>

      <div className="project-card__body">
        <p className="project-card__eyebrow">{project.subtitle}</p>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__meta">
          <span className="project-card__role">{project.role}</span>
          {project.metrics ? <span className="project-card__metrics">{project.metrics}</span> : null}
        </div>

        <ul className="project-card__tags" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project-card__actions">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__btn project-card__btn--primary"
            >
              <FaExternalLinkAlt size={14} aria-hidden="true" />
              Live Demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__btn project-card__btn--ghost"
            >
              <FaGithub size={15} aria-hidden="true" />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
