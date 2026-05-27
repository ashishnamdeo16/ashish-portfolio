"use client";

import { useEffect, useRef } from "react";
import type { ProjectItem } from "@/app/lib/projects.data";

type ProjectWallProps = {
  projects: ProjectItem[];
};

/** Repeat projects like reference (many tiles) for seamless loop at scrollHeight/2 */
function buildTiles(projects: ProjectItem[]): ProjectItem[] {
  const copies = Math.max(8, Math.ceil(40 / Math.max(projects.length, 1)));
  return Array.from({ length: copies }, () => projects).flat();
}

export default function ProjectWall({ projects }: ProjectWallProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollContent = () => {
      if (!scrollingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight + 2) return;

      const half = scrollHeight / 2;
      if (scrollTop >= half - 1) {
        el.scrollTop = 0;
      } else {
        el.scrollTop += 1;
      }
    };

    const intervalId = window.setInterval(scrollContent, 20);

    const pause = () => {
      scrollingRef.current = false;
    };
    const resume = () => {
      scrollingRef.current = true;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    const ro = new ResizeObserver(() => {
      /* Re-measure when images load so scrollHeight > clientHeight */
    });
    ro.observe(el);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) scrollingRef.current = false;
    const onMotionChange = () => {
      scrollingRef.current = !reducedMotion.matches;
    };
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      clearInterval(intervalId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      reducedMotion.removeEventListener("change", onMotionChange);
      ro.disconnect();
    };
  }, [projects]);

  const tiles = buildTiles(projects);

  return (
    <div className="project-wall">
      <div
        ref={scrollRef}
        id="home-magicwall"
        className="project-wall__scroll auto-scroll"
        tabIndex={0}
        aria-label="Scrolling project gallery"
      >
        {tiles.map((p, i) => (
          <div key={`${p.id}-${i}`} className="project-wall__item magic-wall_item">
            <a
              href={p.liveUrl ?? p.githubUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="project-wall__link"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt={p.title} loading={i < 4 ? "eager" : "lazy"} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
