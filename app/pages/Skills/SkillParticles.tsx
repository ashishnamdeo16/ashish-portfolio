"use client";

import React, { useRef, useEffect, JSX } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Icons
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiApachekafka,
  SiAmazons3,
  SiAuth0,
  SiAerospike,
  SiRabbitmq,
  SiDocker,
  SiKubernetes,
  SiJsonwebtokens,
  SiGit,
  SiSwagger,
  SiJunit5,
  SiHibernate,
  SiPrometheus,
  SiNewrelic,
  SiElasticsearch,
  SiKibana,
  SiLogstash,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

interface Skill {
  name: string;
  proficiency: number;
  icon: JSX.Element;
}

const skills: Skill[] = [
  { name: "JavaScript", proficiency: 90, icon: <SiJavascript /> },
  { name: "HTML5", proficiency: 95, icon: <SiHtml5 /> },
  { name: "CSS3", proficiency: 92, icon: <SiCss3 /> },
  { name: "Python", proficiency: 85, icon: <SiPython /> },
  { name: "React", proficiency: 88, icon: <SiReact /> },
  { name: "Node.js", proficiency: 82, icon: <SiNodedotjs /> },
  { name: "MongoDB", proficiency: 80, icon: <SiMongodb /> },
  { name: "MySQL / SQL", proficiency: 78, icon: <SiMysql /> },
  { name: "Redis", proficiency: 75, icon: <SiRedis /> },
  { name: "Aerospike", proficiency: 65, icon: <SiAerospike /> },
  { name: "Kafka", proficiency: 72, icon: <SiApachekafka /> },
  { name: "RabbitMQ", proficiency: 70, icon: <SiRabbitmq /> },
  { name: "AWS S3", proficiency: 76, icon: <SiAmazons3 /> },
  { name: "OAuth2", proficiency: 74, icon: <SiAuth0 /> },
  { name: "JWT", proficiency: 78, icon: <SiJsonwebtokens /> },
  { name: "Java", proficiency: 85, icon: <FaJava /> },
  { name: "JPA", proficiency: 80, icon: <FaJava /> },
  { name: "Hibernate", proficiency: 82, icon: <SiHibernate /> },
  { name: "Docker", proficiency: 83, icon: <SiDocker /> },
  { name: "Kubernetes", proficiency: 70, icon: <SiKubernetes /> },
  { name: "Git", proficiency: 90, icon: <SiGit /> },
  { name: "Swagger", proficiency: 85, icon: <SiSwagger /> },
  { name: "JUnit", proficiency: 82, icon: <SiJunit5 /> },
  { name: "Prometheus", proficiency: 72, icon: <SiPrometheus /> },
  { name: "New Relic", proficiency: 70, icon: <SiNewrelic /> },
  { name: "ELK Stack", proficiency: 68, icon: <SiElasticsearch /> },
  { name: "Logstash", proficiency: 65, icon: <SiLogstash /> },
  { name: "Kibana", proficiency: 70, icon: <SiKibana /> },
];

const Helix: React.FC<{ darkModeFlag: boolean }> = ({ darkModeFlag }) => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);
  const { mouse, viewport } = useThree();

  const radius = 3.2;
  const spacing = 0.7;
  const totalHeight = (skills.length - 1) * spacing;
  const centerY = totalHeight / 2;

  const AUTO_ROTATE_SPEED = 0.05; // slower, gentle rotation
  const MOUSE_ROTATE_Y = 0.25;
  const MOUSE_ROTATE_X = 0.12;
  const isMobile = viewport.width < 6; // disable mouse influence on mobile

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

useFrame((state, delta) => {
  if (!groupRef.current) return;

  // --- Slow constant auto-rotation ---
  groupRef.current.rotation.y += delta * AUTO_ROTATE_SPEED;

  if (!isMobile) {
    // --- Mouse offset (additive) ---
    const mouseOffsetY = 0;
    const mouseOffsetX = 0;

    // Lerp rotation towards base + mouse offset (absolute, not cumulative)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      groupRef.current.rotation.y + mouseOffsetY - groupRef.current.rotation.y % (2 * Math.PI),
      0.04
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseOffsetX,
      0.04
    );
  }

  // --- Scroll vertical ---
  const maxOffset = totalHeight * 0.35;
  const targetY = THREE.MathUtils.lerp(maxOffset, -maxOffset, scrollProgress.current);
  groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
});


  return (
    <group ref={groupRef}>
      {skills.map((skill, idx) => {
        const theta = idx * 0.6;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        const y = centerY - idx * spacing;

        return (
          <group key={skill.name} position={[x, y, z]}>
            <Html center distanceFactor={8}>
              <div  style={{
    color: darkModeFlag ? "#34D399": "#000",
  }}>
                <span className="text-xl">{skill.icon}</span>
                <span className="text-sm font-semibold whitespace-nowrap">{skill.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

const SkillParticles: React.FC<{ darkModeFlag: boolean }> = ({ darkModeFlag }) => {
  return (
    <section id="skills" className="h-screen w-full py-16">
      <h2 className="text-3xl font-extrabold text-center mb-6">Skills</h2>

      <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Helix darkModeFlag={darkModeFlag} />

        <OrbitControls
          enableZoom
          enableRotate={true}
          enablePan={false}
          minDistance={10}
          maxDistance={30}
           autoRotateSpeed={10}
        />
      </Canvas>
    </section>
  );
};

export default SkillParticles;
