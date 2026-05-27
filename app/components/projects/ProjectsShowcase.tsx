"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import RefSectionTitle from "@/app/components/common/RefSectionTitle";
import { PROJECTS, GITHUB_PROFILE } from "@/app/lib/projects.data";
import ProjectWall from "./ProjectWall";
import ProjectCard from "./ProjectCard";

const titleLine1 = ["M", "y", " ", "P", "r", "o", "j", "e", "c", "t", "s"];

export default function ProjectsShowcase() {
  const [showWall, setShowWall] = useState(false);
  const [viewportAmount, setViewportAmount] = useState(0.2);
  const [viewportMargin, setViewportMargin] = useState("0px");

  useEffect(() => {
    const wallMq = window.matchMedia("(min-width: 900px)");
    const revealMq = window.matchMedia("(max-width: 767px)");

    const apply = () => {
      setShowWall(wallMq.matches);
      if (revealMq.matches) {
        setViewportAmount(0.01);
        setViewportMargin("0px 0px -10% 0px");
      } else {
        setViewportAmount(0.2);
        setViewportMargin("0px");
      }
    };

    apply();
    wallMq.addEventListener("change", apply);
    revealMq.addEventListener("change", apply);
    return () => {
      wallMq.removeEventListener("change", apply);
      revealMq.removeEventListener("change", apply);
    };
  }, []);

  return (
    <ScrollReveal
      as="section"
      id="projects"
      className="ref-section ref-section--projects"
      viewportAmount={viewportAmount}
      viewportMargin={viewportMargin}
    >
      <span className="ref-tags ref-tags--html-top" aria-hidden="true">
        &lt;/html&gt;
      </span>
      <span className="ref-tags ref-tags--body-top" aria-hidden="true">
        &lt;body&gt;
      </span>

      <div className="ref-page">
        <div className="ref-page__text">
          <RefSectionTitle lines={[titleLine1]} idxOffsets={[15]} />

          <p className="ref-body">
            I specialize in building full-stack applications that balance reliable backends with
            thoughtful frontends. From authentication services and network security tools to mobile
            apps and developer products, each project reflects clarity in design and efficiency in
            execution.
            <br />
            <br />
            As a Software Engineer and graduate student, I&apos;ve shipped systems using Java, Spring
            Boot, React, Node.js, and cloud-native tooling across real-world product environments.
            <br />
            <br />
            This is a selection of my latest work.
            <br />
            <Link
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="ref-link"
            >
              Wanna take a quick view?
            </Link>
          </p>
        </div>

        {showWall ? (
          <div className="ref-page__visual ref-page__visual--wall" aria-hidden={!showWall}>
            <ProjectWall projects={PROJECTS} />
          </div>
        ) : null}
      </div>

      {/* Compact cards: mobile + optional detail row */}
      <div className="ref-section__cards" aria-label="Project details">
        <div className="ref-section__cards-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} variant={p.featured ? "featured" : "standard"} />
          ))}
        </div>
      </div>

      <span className="ref-tags ref-tags--body-bottom" aria-hidden="true">
        &lt;/body&gt;
        <br />
        <span className="ref-tags--html-nested">&lt;/html&gt;</span>
      </span>
    </ScrollReveal>
  );
}
