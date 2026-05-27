"use client";

import { motion, useReducedMotion } from "framer-motion";

const scrollReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const scrollRevealReduced = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0 },
};

type ScrollRevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  id?: string;
  /** Override intersection threshold (e.g. lower on mobile for tall sections). */
  viewportAmount?: number;
  /** Override viewport root margin passed to framer-motion. */
  viewportMargin?: string;
};

const motionComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
};

export default function ScrollReveal({
  children,
  as = "div",
  className,
  delay = 0,
  id,
  viewportAmount,
  viewportMargin,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const config = prefersReducedMotion ? scrollRevealReduced : scrollReveal;
  const viewport =
    viewportAmount !== undefined || viewportMargin !== undefined
      ? {
          once: true as const,
          amount: viewportAmount ?? scrollReveal.viewport.amount,
          ...(viewportMargin !== undefined ? { margin: viewportMargin } : {}),
        }
      : config.viewport;
  const Component = motionComponents[as];
  return (
    <Component
      id={id}
      initial={config.initial}
      whileInView={config.whileInView}
      viewport={viewport}
      transition={prefersReducedMotion ? config.transition : { ...scrollReveal.transition, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
