"use client";

import { useEffect, useState } from "react";
import AnimatedLetters from "./AnimatedLetters";

type RefSectionTitleProps = {
  lines: string[][];
  idxOffsets?: number[];
};

/** Reference-style section title: accent color, script open/close tags on h1 */
export default function RefSectionTitle({ lines, idxOffsets }: RefSectionTitleProps) {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    const t = setTimeout(() => setLetterClass("text-animate-hover"), 3300);
    return () => clearTimeout(t);
  }, []);

  return (
    <h1 className="ref-title">
      {lines.map((arr, lineIndex) => (
        <span key={lineIndex} className="ref-title__line">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={arr}
            idx={idxOffsets?.[lineIndex] ?? 15 + lineIndex * 10}
          />
          {lineIndex < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </h1>
  );
}
