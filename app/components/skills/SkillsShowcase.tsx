"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import RefSectionTitle from "@/app/components/common/RefSectionTitle";

const SkillsTagCloud = dynamic(() => import("./SkillsTagCloud"), {
  ssr: false,
  loading: () => <div className="skills-cloud skills-cloud--loading" aria-hidden="true" />,
});

const titleLine1 = ["S", "k", "i", "l", "l", "s", " ", "&"];
const titleLine2 = ["E", "x", "p", "e", "r", "i", "e", "n", "c", "e"];

export default function SkillsShowcase() {
  return (
    <ScrollReveal as="section" id="skills" className="ref-section ref-section--skills">
      <span className="ref-tags ref-tags--html-top" aria-hidden="true">
        &lt;/html&gt;
      </span>
      <span className="ref-tags ref-tags--body-top" aria-hidden="true">
        &lt;body&gt;
      </span>

      <div className="ref-page">
        <div className="ref-page__text">
          <RefSectionTitle lines={[titleLine1, titleLine2]} idxOffsets={[15, 22]} />

          <p className="ref-body">
            The main area of my expertise is full-stack software engineering — backend services,
            APIs, and modern web interfaces.
            <br />
            <br />
            • Languages: Java, JavaScript, TypeScript, Python, SQL, HTML/CSS
            <br />
            • Frameworks: React, Node.js, Spring Boot, Flutter
            <br />
            • Data &amp; messaging: MongoDB, MySQL, Redis, Kafka, Elasticsearch
            <br />
            • Cloud &amp; DevOps: Docker, Kubernetes, AWS, Prometheus, CI/CD
            <br />
            • Focus areas: system design, distributed systems, AI/ML integration
          </p>
        </div>

        <div className="ref-page__visual ref-page__visual--cloud">
          <SkillsTagCloud />
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
