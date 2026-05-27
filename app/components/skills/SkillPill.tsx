"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillEntry } from "@/app/lib/skills.data";

type SkillPillProps = {
  skill: SkillEntry;
  index: number;
};

export default function SkillPill({ skill, index }: SkillPillProps) {
  const reduced = useReducedMotion();
  const Icon = skill.icon;
  const level = skill.level ?? 75;

  return (
    <motion.li
      className="skill-pill"
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={reduced ? { duration: 0 } : { duration: 0.35, delay: index * 0.04 }}
      whileHover={reduced ? undefined : { y: -3, scale: 1.03 }}
    >
      <span className="skill-pill__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="skill-pill__name">{skill.name}</span>
      {skill.level != null ? (
        <span className="skill-pill__bar" aria-hidden="true">
          <span className="skill-pill__bar-fill" style={{ width: `${level}%` }} />
        </span>
      ) : null}
      <span className="sr-only">{skill.level != null ? `${level}% proficiency` : ""}</span>
    </motion.li>
  );
}
