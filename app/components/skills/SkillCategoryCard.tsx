"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/app/lib/skills.data";
import SkillPill from "./SkillPill";

type SkillCategoryCardProps = {
  category: SkillCategory;
  index: number;
};

export default function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="skill-category-card"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, delay: index * 0.07 }}
    >
      <header className="skill-category-card__head">
        <h3 className="skill-category-card__title">{category.label}</h3>
        <p className="skill-category-card__desc">{category.description}</p>
      </header>
      <ul className="skill-category-card__pills">
        {category.skills.map((skill, i) => (
          <SkillPill key={skill.name} skill={skill} index={i} />
        ))}
      </ul>
    </motion.article>
  );
}
