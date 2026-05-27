"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedLetters from "@/app/components/common/AnimatedLetters";
import { SITE } from "@/app/lib/site";

const nameArray = ["A", "s", "h", "i", "s", "h", ","];
const roleArray = [
  "s",
  "o",
  "f",
  "t",
  "w",
  "a",
  "r",
  "e",
  "\u00A0",
  "e",
  "n",
  "g",
  "i",
  "n",
  "e",
  "e",
  "r",
  ".",
];

export default function Hero() {
  const [letterClass, setLetterClass] = useState("text-animate");

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass("text-animate-hover"), 4000);
    return () => clearTimeout(timer);
  }, []);

  const onEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.classList.add("rubberBand");
  };
  const onEnd = (e: React.AnimationEvent<HTMLSpanElement>) => {
    e.currentTarget.classList.remove("rubberBand");
  };

  return (
    <section className="hero-page" id="hero" aria-label="Introduction">
      <span className="hero-page__tags hero-page__tags--top-html">&lt;/html&gt;</span>
      <span className="hero-page__tags hero-page__tags--top-body">&lt;body&gt;</span>

      <div className="hero-page__inner">
        <div className="hero-page__text">
          <h1>
            <span className={letterClass} onMouseEnter={onEnter} onAnimationEnd={onEnd}>
              H
            </span>
            <span className={`${letterClass} _12`} onMouseEnter={onEnter} onAnimationEnd={onEnd}>
              i,
            </span>
            <br />
            <span className={`${letterClass} _13`} onMouseEnter={onEnter} onAnimationEnd={onEnd}>
              I
            </span>
            <span className={`${letterClass} _14`} onMouseEnter={onEnter} onAnimationEnd={onEnd}>
              &apos;m
            </span>{" "}
            <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
            <br />
            <AnimatedLetters letterClass={letterClass} strArray={roleArray} idx={22} />
          </h1>

          <p className="hero-page__subtitle">{SITE.subtitle}</p>

          <Link href="/contact" className="hero-page__cta">
            Contact me
          </Link>
        </div>

        <div className="hero-page__portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/ashish1.webp" alt={`Portrait of ${SITE.name}`} width={400} height={500} loading="eager" />
        </div>
      </div>

      <span className="hero-page__tags hero-page__tags--bottom">
        &lt;/body&gt;
        <br />
        <span style={{ marginLeft: "-1.25rem" }}>&lt;/html&gt;</span>
      </span>
    </section>
  );
}
