"use client";

import { useEffect, useRef } from "react";
import TagCloud from "TagCloud";
import { SKILL_CATEGORIES } from "@/app/lib/skills.data";

const TAGS = SKILL_CATEGORIES.flatMap((c) => c.skills.map((s) => s.name));

export default function SkillsTagCloud() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cloudRef.current;
    if (!el) return;

    const cloud = TagCloud(el, TAGS, {
      radius: typeof window !== "undefined" && window.innerWidth < 768 ? 200 : 320,
      maxSpeed: "fast",
      initSpeed: "fast",
      direction: 135,
      keep: true,
    });

    let scale = 1;
    let ticking = false;

    const updateTransform = () => {
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(-50%) scale(${scale})`;
      }
      ticking = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scale += e.deltaY * -0.0015;
      scale = Math.min(Math.max(0.45, scale), 2.5);
      if (!ticking) {
        requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    const wrap = wrapRef.current;
    wrap?.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      wrap?.removeEventListener("wheel", onWheel);
      const inst = cloud as { destroy?: () => void };
      if (inst?.destroy) inst.destroy();
      el.innerHTML = "";
    };
  }, []);

  return (
    <div ref={wrapRef} className="skills-cloud-wrap">
      <div ref={cloudRef} className="skills-cloud" aria-label="Interactive skills tag cloud" />
      <p className="skills-cloud-hint">Scroll here to zoom in and out</p>
    </div>
  );
}
