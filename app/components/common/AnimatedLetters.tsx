"use client";

import { useCallback } from "react";

type AnimatedLettersProps = {
  letterClass: string;
  strArray: string[];
  idx: number;
};

export default function AnimatedLetters({ letterClass, strArray, idx }: AnimatedLettersProps) {
  const onEnter = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.classList.add("rubberBand");
  }, []);

  const onEnd = useCallback((e: React.AnimationEvent<HTMLSpanElement>) => {
    e.currentTarget.classList.remove("rubberBand");
  }, []);

  return (
    <span aria-hidden="true">
      {strArray.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`${letterClass} _${i + idx}`}
          onMouseEnter={onEnter}
          onAnimationEnd={onEnd}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
