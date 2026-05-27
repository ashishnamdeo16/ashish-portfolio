"use client";

import { SKILL_CATEGORIES } from "@/app/lib/skills.data";

const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills.map((s) => s.name));

export default function SkillsMarquee() {
  const row = [...allSkills, ...allSkills];

  return (
    <div className="skills-marquee" aria-hidden="true">
      <div className="skills-marquee__track">
        {row.map((name, i) => (
          <span key={`${name}-${i}`} className="skills-marquee__item">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
